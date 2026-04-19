using System;
using UnityEngine;
using UnityEngine.UI;

namespace Scarlett.UI
{
    public class IntroPanel : UIPanel
    {
        [SerializeField] Button continueButton;

        Action _onStart;
        Action _onContinue;

        public void Setup(Action onStart, Action onContinue = null)
        {
            _onStart    = onStart;
            _onContinue = onContinue;

            if (continueButton != null)
                continueButton.interactable = onContinue != null;

            Show();
        }

        public void OnClickStart()   { Hide(); _onStart?.Invoke(); }
        public void OnClickContinue() { Hide(); _onContinue?.Invoke(); }
        public void OnClickSetting() { GameUI.Instance?.ShowPopup("설정 기능은 준비 중입니다."); }
        public void OnClickCredits() { Debug.Log("[IntroPanel] Credits - 미구현"); }
        public void OnClickExit()
        {
#if UNITY_EDITOR
            UnityEditor.EditorApplication.isPlaying = false;
#else
            Application.Quit();
#endif
        }
    }
}
