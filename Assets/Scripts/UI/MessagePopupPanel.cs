using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Scarlett.UI
{
    public class MessagePopupPanel : UIPanel
    {
        [SerializeField] TMP_Text titleText;
        [SerializeField] TMP_Text descText;
        [SerializeField] TMP_Text confirmLabel;
        [SerializeField] TMP_Text cancelLabel;
        [SerializeField] Button   confirmButton;
        [SerializeField] Button   cancelButton;

        Action _onConfirm;
        Action _onCancel;

        public void Setup(PopupMessageType type, Action onConfirm = null, Action onCancel = null)
        {
            if (!PopupMessageDatabase.All.TryGetValue(type, out var data)) return;

            if (titleText   != null) titleText.text   = data.Title;
            if (descText    != null) descText.text     = data.Desc;
            if (confirmLabel != null) confirmLabel.text = data.Confirm;
            if (cancelLabel  != null) cancelLabel.text  = data.Cancel;

            _onConfirm = onConfirm;
            _onCancel  = onCancel;

            if (confirmButton != null)
            {
                confirmButton.onClick.RemoveAllListeners();
                confirmButton.onClick.AddListener(OnClickConfirm);
            }
            if (cancelButton != null)
            {
                cancelButton.onClick.RemoveAllListeners();
                cancelButton.onClick.AddListener(OnClickCancel);
            }

            Show();
        }

        public void OnClickConfirm() { Hide(); _onConfirm?.Invoke(); }
        public void OnClickCancel()  { Hide(); _onCancel?.Invoke();  }
    }
}
