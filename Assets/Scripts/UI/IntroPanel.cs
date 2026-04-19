using System;
using UnityEngine;

namespace Scarlett.UI
{
    public class IntroPanel : UIPanel
    {
        Action _onStart;

        public void Setup(Action onStart)
        {
            _onStart = onStart;
            Show();
        }

        public void OnClickStart()   { Hide(); _onStart?.Invoke(); }
        public void OnClickContinue(){ Debug.Log("[IntroPanel] Continue - 미구현"); }
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
