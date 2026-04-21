using Scarlett.Story;
using UnityEngine;

namespace Scarlett.UI
{
    public class SettingPanel : UIPanel
    {
        public void OnClickSave()
        {
            var runner = FindObjectOfType<StoryRunner>();
            if (runner == null) { Debug.LogWarning("[SettingPanel] StoryRunner 없음"); return; }
            GameUI.Instance?.ShowSaveStoryPanel(saveMode: true, runner);
        }

        public void OnClickLoad()
        {
            GameUI.Instance?.ShowSaveStoryPanel(saveMode: false, null);
        }

        public void OnClickGoTitle()
        {
            GameUI.Instance?.ShowMessagePopup(PopupMessageType.GoTitleConfirm, onConfirm: () => GameUI.Instance?.GoToTitle());
        }
    }
}
