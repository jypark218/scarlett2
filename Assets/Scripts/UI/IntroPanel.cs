using System;
using UnityEngine;
using UnityEngine.UI;

namespace Scarlett.UI
{
    public class IntroPanel : UIPanel
    {
        [SerializeField] Button continueButton;
        [SerializeField] Button endingGalleryButton;

        Action _onStart;
        Action _onContinue;

        public void Setup(Action onStart, Action onContinue = null)
        {
            _onStart    = onStart;
            _onContinue = onContinue;

            if (continueButton != null)
            {
                bool canContinue = onContinue != null;
                // 버튼을 비활성화하거나, 아예 오브젝트를 숨기려면 아래 주석 해제
                continueButton.interactable = canContinue;
                continueButton.gameObject.SetActive(canContinue); 
            }

            // 엔딩을 한 번이라도 본 적이 있을 때만 엔딩 갤러리 버튼 노출
            if (endingGalleryButton != null)
            {
                bool hasEnding = Scarlett.Story.SaveManager.HasAnyEnding;
                endingGalleryButton.gameObject.SetActive(hasEnding);
            }

            Show();
        }

        public void OnClickStart()   { Hide(); _onStart?.Invoke(); }
        public void OnClickContinue() { Hide(); _onContinue?.Invoke(); }
        public void OnClickGallery() { Debug.Log("[IntroPanel] Ending Gallery - 미구현"); }
        public void OnClickSetting() => GameUI.Instance?.ShowSettingPopup();
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
