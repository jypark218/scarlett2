using System;
using Scarlett.Story;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Scarlett.UI
{
    public class SaveSlotItem : MonoBehaviour
    {
        [SerializeField] GameObject normalGroup;
        [SerializeField] GameObject emptyGroup;
        [SerializeField] TMP_Text   titleText;
        [SerializeField] TMP_Text   timeText;

        SaveSlotData _data;
        Action<int>  _onSelect;

        public void Setup(SaveSlotData data, Action<int> onSelect)
        {
            _data     = data;
            _onSelect = onSelect;

            var btn = GetComponent<Button>();
            if (btn != null)
            {
                btn.onClick.RemoveAllListeners();
                btn.onClick.AddListener(OnClick);
            }

            bool hasData = !data.IsEmpty;
            normalGroup?.SetActive(hasData);
            emptyGroup?.SetActive(!hasData);

            if (hasData)
            {
                if (titleText != null) titleText.text = data.title ?? $"슬롯 {data.slotIndex + 1}";
                if (timeText  != null) timeText.text  = data.saveTime ?? "-";
            }
        }

        public void OnClick() => _onSelect?.Invoke(_data.slotIndex);
    }
}
