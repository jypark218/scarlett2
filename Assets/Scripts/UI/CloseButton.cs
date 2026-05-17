using UnityEngine;
using UnityEngine.UI;

namespace Scarlett.UI
{
    [RequireComponent(typeof(Button))]
    public class CloseButton : MonoBehaviour
    {
        void Awake()
        {
            GetComponent<Button>().onClick.AddListener(() =>
                GetComponentInParent<UIPanel>()?.Hide());
        }
    }
}
