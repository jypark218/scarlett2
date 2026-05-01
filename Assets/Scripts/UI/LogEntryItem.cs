using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Scarlett.UI
{
    public class LogEntryItem : MonoBehaviour
    {
        [SerializeField] TMP_Text speakerText;
        [SerializeField] TMP_Text dialogueText;
        [SerializeField] Image    decoImage;

        public void Setup(string speaker, string text, Color speakerColor)
        {
            if (speakerText != null)
                speakerText.text = speaker ?? string.Empty;

            if (dialogueText != null)
                dialogueText.text = text ?? string.Empty;

            if (decoImage != null)
                decoImage.color = speakerColor;
        }
    }
}
