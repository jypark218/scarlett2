using Scarlett.Story;
using TMPro;
using UnityEngine;

namespace Scarlett.UI
{
    public class SaveStoryPanel : UIPanel
    {
        [SerializeField] Transform    content;
        [SerializeField] SaveSlotItem slotTemplate;
        [SerializeField] TMP_Text     titleText;

        bool        _isSaveMode;
        StoryRunner _runner;

        void Awake()
        {
            slotTemplate?.gameObject.SetActive(false);
        }

        public void OpenForSave(StoryRunner runner)
        {
            _isSaveMode = true;
            _runner     = runner;
            if (titleText != null) titleText.text = "저장";
            Show();
            Refresh();
        }

        public void OpenForLoad()
        {
            _isSaveMode = false;
            _runner     = null;
            if (titleText != null) titleText.text = "불러오기";
            Show();
            Refresh();
        }

        void Refresh()
        {
            foreach (Transform child in content)
                if (child.gameObject != slotTemplate?.gameObject) Destroy(child.gameObject);

            if (slotTemplate == null) { Debug.LogError("[SaveStoryPanel] slotTemplate 없음"); return; }

            var slots = SaveManager.LoadAllSlots();
            foreach (var data in slots)
            {
                var item = Instantiate(slotTemplate, content);
                item.gameObject.SetActive(true);
                item.Setup(data, OnSlotSelected);
            }
        }

        void OnSlotSelected(int slotIndex)
        {
            if (_isSaveMode)
            {
                var existing = SaveManager.LoadSlot(slotIndex);
                if (existing != null && !existing.IsEmpty)
                    GameUI.Instance?.ShowMessagePopup(PopupMessageType.SaveConfirm, onConfirm: () => DoSave(slotIndex));
                else
                    DoSave(slotIndex);
            }
            else
            {
                var data = SaveManager.LoadSlot(slotIndex);
                if (data == null || data.IsEmpty) { GameUI.Instance?.ShowToast(ToastType.NoSaveData); return; }
                GameUI.Instance?.ShowMessagePopup(PopupMessageType.LoadConfirm, onConfirm: () => DoLoad(data));
            }
        }

        void DoSave(int slotIndex)
        {
            if (_runner == null) return;
            _runner.SaveToSlot(slotIndex);
            Hide();
            GameUI.Instance?.ShowToast(ToastType.SaveComplete);
        }

        void DoLoad(SaveSlotData data)
        {
            var runner = FindObjectOfType<StoryRunner>();
            if (runner == null) { GameUI.Instance?.ShowToast(ToastType.LoadFailed); return; }
            Hide();
            GameUI.Instance?.Dialogue.Hide();
            GameUI.Instance?.ShowToast(ToastType.LoadComplete);
            runner.ContinueFromSlot(data);
        }
    }
}
