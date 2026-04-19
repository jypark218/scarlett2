using Scarlett.Story;
using Scarlett.UI;
using UnityEngine;

namespace Scarlett
{
    public class GameStarter : MonoBehaviour
    {
        [SerializeField] StoryRunner storyRunner;

        void Start()
        {
            var intro = GameUI.Instance?.Intro;
            if (intro == null) { Debug.LogError("[GameStarter] IntroPanel 없음"); return; }

            var hasSave = StoryRunner.HasSave;
            intro.Setup(
                onStart:    StartWithOpening,
                onContinue: hasSave ? (System.Action)storyRunner.ContinueGame : null
            );
        }

        void StartWithOpening()
        {
            var opening = GameUI.Instance?.Opening;
            if (opening == null)
            {
                // 오프닝 프리팹 없으면 바로 시작
                storyRunner?.StartNewGame();
                return;
            }
            opening.Setup(() => storyRunner?.StartNewGame());
        }
    }
}
