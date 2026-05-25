using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Scarlett.UI
{
    public class PopupEndingstoryPanel : UIPanel
    {
        [SerializeField] TMP_Text text_endingType;
        [SerializeField] TMP_Text text_endingNumber;
        [SerializeField] TMP_Text text_desc;
        [SerializeField] Button   confirmButton;

        static readonly Color ColorBad   = new Color(0.9f, 0.2f, 0.2f); // 빨강
        static readonly Color ColorGood  = new Color(0.2f, 0.5f, 1.0f); // 파랑
        static readonly Color ColorTrue  = new Color(0.6f, 0.2f, 0.9f); // 보라
        static readonly Color ColorOther = Color.white;

        public void Setup(string endingType, int endingNumber, string endingSummary, System.Action onConfirm = null)
        {
            var (label, color) = endingType switch
            {
                "bad"     => ("배드 엔딩", ColorBad),
                "good"    => ("해피 엔딩", ColorGood),
                "true"    => ("진 엔딩",   ColorTrue),
                "neutral" => ("일반 엔딩", ColorOther),
                _         => ("엔딩",      ColorOther)
            };

            if (text_endingType   != null) { text_endingType.text  = label; text_endingType.color = color; }
            if (text_endingNumber != null) { text_endingNumber.text = $"Ending {endingNumber:D2}"; text_endingNumber.color = color; }
            if (text_desc         != null) text_desc.text = endingSummary ?? string.Empty;

            if (confirmButton != null)
            {
                confirmButton.onClick.RemoveAllListeners();
                confirmButton.onClick.AddListener(() => { onConfirm?.Invoke(); Hide(); });
            }

            Show();
        }
    }
}
