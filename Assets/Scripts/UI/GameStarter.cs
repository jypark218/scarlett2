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
            intro.Setup(onStart: () => storyRunner?.StartNewGame());
        }
    }
}
