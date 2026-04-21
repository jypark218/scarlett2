using UnityEngine;

namespace Scarlett.UI
{
    public abstract class UIPanel : MonoBehaviour
    {
        public virtual void Show() => gameObject.SetActive(true);
        public virtual void Hide() => gameObject.SetActive(false);
        public bool IsVisible => gameObject.activeSelf;

        /// <summary>닫기 버튼 onClick에 연결. 모든 패널 공통 사용.</summary>
        public virtual void OnClickClose() => Hide();
    }
}
