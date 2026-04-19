using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Scarlett.UI
{
    public class PopupPanel : UIPanel
    {
        [SerializeField] TMP_Text messageText;
        [SerializeField] Button   confirmButton;
        [SerializeField] TMP_Text confirmLabel;
        [SerializeField] Button   cancelButton;
        [SerializeField] TMP_Text cancelLabel;

        public void Setup(string message, string confirm = "확인", string cancel = null,
                          Action onConfirm = null, Action onCancel = null)
        {
            if (messageText != null) messageText.text = message;

            if (confirmButton != null)
            {
                confirmButton.onClick.RemoveAllListeners();
                confirmButton.onClick.AddListener(() => { onConfirm?.Invoke(); GameUI.Instance.CloseTopPopup(); });
                if (confirmLabel != null) confirmLabel.text = confirm;
            }

            if (cancelButton != null)
            {
                bool has = !string.IsNullOrEmpty(cancel);
                cancelButton.gameObject.SetActive(has);
                if (has)
                {
                    cancelButton.onClick.RemoveAllListeners();
                    cancelButton.onClick.AddListener(() => { onCancel?.Invoke(); GameUI.Instance.CloseTopPopup(); });
                    if (cancelLabel != null) cancelLabel.text = cancel;
                }
            }
        }
    }
}
