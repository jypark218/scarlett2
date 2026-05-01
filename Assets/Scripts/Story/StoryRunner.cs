using System.Text.RegularExpressions;
using Scarlett.UI;
using UnityEngine;

namespace Scarlett.Story
{
    public class StoryRunner : MonoBehaviour
    {
        [SerializeField] string storyJsonPath  = "Story/ScarlettFullGraph";
        [SerializeField] string startNodeId    = "start";
        [SerializeField] StoryAuthoringDatabase authoringDatabase;

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

        public void SaveToSlot(int slotIndex)
        {
            if (_player == null) return;
            SaveManager.SaveSlot(slotIndex, storyJsonPath, _player);
        }

        public void ContinueFromSlot(SaveSlotData data)
        {
            if (data == null || data.IsEmpty) return;
            LoadGraph(data.storyJsonPath, data.progress);
            _player.TryEnter(data.currentNodeId);
            ShowCurrentNode();
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
            _player = new StoryNodePlayer(authoring: authoringDatabase, existingProgress: existingProgress);
            _player.SetGraph(list.nodes);
        }

        void ShowCurrentNode()
        {
            var cur = _player?.Current;
            if (cur == null) { ShowEnding(null); return; }

            if (cur.isEnding)
            {
                ShowNodeText(cur);
                return;
            }

            var choices   = _player.GetAvailableChoices();
            bool hasText  = !string.IsNullOrWhiteSpace(cur.text);
            bool hasChoices = choices.Count > 0;

            if (hasText && hasChoices)
            {
                // 텍스트 먼저 보여주고, next 클릭 후 선택지 표시
                ShowNodeText(cur, onNext: () => ShowChoices(choices));
            }
            else if (hasChoices)
            {
                ShowChoices(choices);
            }
            else
            {
                ShowNodeText(cur, onNext: OnNextClicked);
            }
        }

        void ShowChoices(System.Collections.Generic.IReadOnlyList<Choice> choices)
        {
            var labels = new string[choices.Count];
            for (int i = 0; i < choices.Count; i++)
                labels[i] = choices[i].text ?? $"선택지 {i + 1}";
            GameUI.Instance.Dialogue.SetChoices(labels, OnChoiceSelected);
        }

        void ShowNodeText(StoryNode node, System.Action onNext = null)
        {
            var binding     = _player.ResolveSpeaker();
            var speakerId   = node.speakerId;
            var displayName = !string.IsNullOrEmpty(speakerId)
                ? (binding?.displayName ?? speakerId)
                : null;
            var color   = binding != null ? binding.nameColor : UnityEngine.Color.white;
            var sprite  = binding?.GetSprite(node.expressionKey ?? "default");
            var text    = StripNameTags(string.IsNullOrEmpty(node.text) ? " " : node.text);
            GameUI.Instance.Dialogue.SetDialogue(displayName, text, color, sprite, onNext: onNext ?? (() => ShowEnding(node)));
        }

        static readonly Regex _nameTagRegex = new Regex(@"^\[.*?\]:\s*", RegexOptions.Multiline);

        static string StripNameTags(string text) => _nameTagRegex.Replace(text, string.Empty);

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
            {
                SaveGame();
                ShowCurrentNode();
            }
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
