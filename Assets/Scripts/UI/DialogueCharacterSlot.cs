using UnityEngine;
using UnityEngine.UI;

namespace Scarlett.UI
{
    public class DialogueCharacterSlot : MonoBehaviour
    {
        Image _image;

        public string SpeakerId { get; private set; }

        void Awake() => _image = GetComponent<Image>();

        public void Assign(string speakerId, Sprite sprite)
        {
            SpeakerId = speakerId;
            _image.sprite = sprite;
            gameObject.SetActive(true);
        }

        public void SetFocus(bool focused)
        {
            var c = _image.color;
            c.a = focused ? 1f : 0.5f;
            _image.color = c;
        }

        public void Clear()
        {
            SpeakerId = null;
            _image.sprite = null;
            gameObject.SetActive(false);
        }
    }
}
