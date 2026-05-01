using UnityEngine;
using UnityEngine.UI;

namespace Scarlett.UI
{
    public class DialogueCharacterSlot : MonoBehaviour
    {
        Image _image;
        Image Img => _image != null ? _image : (_image = GetComponentInChildren<Image>());

        public string SpeakerId { get; private set; }

        public void Assign(string speakerId, Sprite sprite)
        {
            SpeakerId = speakerId;
            Img.sprite = sprite;
            gameObject.SetActive(true);
        }

        public void SetFocus(bool focused)
        {
            var c = Img.color;
            c.a = focused ? 1f : 0.5f;
            Img.color = c;
        }

        public void Clear()
        {
            SpeakerId = null;
            Img.sprite = null;
            gameObject.SetActive(false);
        }
    }
}
