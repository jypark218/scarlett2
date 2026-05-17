using UnityEngine;

namespace Scarlett.UI
{
    public class UICloser : MonoBehaviour
    {
        public void Close() => GetComponentInParent<UIPanel>()?.Hide();
    }
}
