using Scarlett.Story;
using TMPro;
using UnityEngine;

namespace Scarlett.UI
{
    public class StoryLogEntryItem : MonoBehaviour
    {
        [SerializeField] GameObject chatGroup;
        [SerializeField] GameObject narrationGroup;
        [SerializeField] TMP_Text   characterText;
        [SerializeField] TMP_Text   descText;
        [SerializeField] TMP_Text   narrationText;

        public void Setup(StoryLogEntry entry)
        {
            bool isNarration = entry.IsNarration;
            chatGroup?.SetActive(!isNarration);
            narrationGroup?.SetActive(isNarration);

            if (isNarration)
            {
                if (narrationText != null) narrationText.text = entry.Text;
            }
            else
            {
                if (characterText != null) characterText.text = entry.Speaker;
                if (descText      != null) descText.text      = entry.Text;
            }
        }
    }
}
