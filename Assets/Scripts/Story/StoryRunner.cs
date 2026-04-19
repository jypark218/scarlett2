using Scarlett.UI;
using UnityEngine;

namespace Scarlett.Story
{
    public class StoryRunner : MonoBehaviour
    {
        [SerializeField] string storyJsonPath = "Story/ScarlettDemoGraph";

        StoryNodePlayer _player;

        public void StartNewGame()
        {
            var ta = Resources.Load<TextAsset>(storyJsonPath);
            if (ta == null) { Debug.LogError($"[StoryRunner] JSON 없음: {storyJsonPath}"); return; }

            var list = StoryGraphJsonUtility.ListFromJson(ta.text);
            if (list?.nodes == null || list.nodes.Length == 0) { Debug.LogError("[StoryRunner] 노드 없음"); return; }

            _player = new StoryNodePlayer();
            _player.SetGraph(list.nodes);
            _player.TryEnter(list.nodes[0].id);

            ShowCurrentNode();
        }

        void ShowCurrentNode()
        {
            var cur = _player?.Current;
            if (cur == null) { ShowEnding(); return; }

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
                var speaker = string.IsNullOrEmpty(cur.speakerId) ? null : cur.speakerId;
                var text    = string.IsNullOrEmpty(cur.text)     ? " "  : cur.text;
                GameUI.Instance.Dialogue.SetDialogue(speaker, text, onNext: OnNextClicked);
            }
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
                ShowEnding();
            }
        }

        void OnChoiceSelected(int index)
        {
            var before = _player.Current?.id;
            _player.TrySelectAvailableChoice(index);
            var after = _player.Current?.id;

            if (after == null || after == before)
                ShowEnding();
            else
                ShowCurrentNode();
        }

        void ShowEnding()
        {
            GameUI.Instance.Dialogue.Hide();
            GameUI.Instance.Intro.Setup(onStart: StartNewGame);
        }
    }
}
