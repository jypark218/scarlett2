using Scarlett.UI;
using UnityEngine;

namespace Scarlett.Story
{
    public class StoryRunner : MonoBehaviour
    {
        [SerializeField] string storyJsonPath  = "Story/ScarlettFullGraph";
        [SerializeField] string startNodeId    = "start";

        StoryNodePlayer _player;

        public void StartNewGame()
        {
            LoadGraph();
            if (_player == null) { Debug.LogError("[StoryRunner] LoadGraph 실패 - _player null"); return; }
            var entered = _player.TryEnter(startNodeId);
            Debug.Log($"[StoryRunner] TryEnter('{startNodeId}'): {entered}");
            ShowCurrentNode();
        }

        public void ContinueGame()
        {
            if (!SaveManager.TryLoad(out var path, out var nodeId, out var progress))
            {
                Debug.LogWarning("[StoryRunner] 저장 데이터 없음");
                return;
            }
            LoadGraph(path, progress);
            _player.TryEnter(nodeId);
            ShowCurrentNode();
        }

        public void SaveGame()
        {
            if (_player == null) return;
            SaveManager.Save(storyJsonPath, _player);
        }

        public static bool HasSave => SaveManager.HasSave;

        void LoadGraph(string path = null, StoryProgress existingProgress = null)
        {
            var loadPath = path ?? storyJsonPath;
            Debug.Log($"[StoryRunner] LoadGraph: {loadPath}");
            var ta = Resources.Load<TextAsset>(loadPath);
            if (ta == null) { Debug.LogError($"[StoryRunner] JSON 없음: {loadPath}"); return; }

            var list = StoryGraphJsonUtility.ListFromJson(ta.text);
            if (list?.nodes == null || list.nodes.Length == 0) { Debug.LogError("[StoryRunner] 노드 없음"); return; }

            Debug.Log($"[StoryRunner] 노드 {list.nodes.Length}개 로드됨");
            _player = new StoryNodePlayer(existingProgress: existingProgress);
            _player.SetGraph(list.nodes);
        }

        void ShowCurrentNode()
        {
            var cur = _player?.Current;
            if (cur == null) { ShowEnding(null); return; }

            SaveGame();

            // 엔딩 노드 처리
            if (cur.isEnding)
            {
                ShowNodeText(cur);
                return;
            }

            var choices = _player.GetAvailableChoices();
            if (choices.Count > 0)
            {
                var labels = new string[choices.Count];
                for (int i = 0; i < choices.Count; i++)
                    labels[i] = choices[i].text ?? $"선택지 {i + 1}";
                GameUI.Instance.Dialogue.SetChoices(labels, OnChoiceSelected);
            }
            else
            {
                ShowNodeText(cur, onNext: OnNextClicked);
            }
        }

        void ShowNodeText(StoryNode node, System.Action onNext = null)
        {
            var speaker = string.IsNullOrEmpty(node.speakerId) ? null : node.speakerId;
            var text    = string.IsNullOrEmpty(node.text)     ? " "  : node.text;
            GameUI.Instance.Dialogue.SetDialogue(speaker, text, onNext: onNext ?? (() => ShowEnding(node)));
        }

        void OnNextClicked()
        {
            var cur = _player?.Current;
            if (!string.IsNullOrEmpty(cur?.nextNodeId))
            {
                _player.TryEnter(cur.nextNodeId);
                ShowCurrentNode();
            }
            else
            {
                ShowEnding(cur);
            }
        }

        void OnChoiceSelected(int index)
        {
            var before = _player.Current?.id;
            _player.TrySelectAvailableChoice(index);
            var after = _player.Current?.id;

            if (after == null || after == before)
                ShowEnding(null);
            else
                ShowCurrentNode();
        }

        void ShowEnding(StoryNode endingNode)
        {
            string endingLabel = null;
            if (endingNode != null && endingNode.isEnding)
            {
                endingLabel = endingNode.endingType switch
                {
                    "good"    => "해피 엔딩",
                    "bad"     => "배드 엔딩",
                    "neutral" => "일반 엔딩",
                    "true"    => "진 엔딩",
                    _         => "엔딩"
                };
            }

            GameUI.Instance.Dialogue.Hide();

            var onContinue = HasSave ? (System.Action)null : null;
            GameUI.Instance.Intro.Setup(
                onStart:    StartNewGame,
                onContinue: HasSave ? (System.Action)ContinueGame : null
            );
        }
    }
}
