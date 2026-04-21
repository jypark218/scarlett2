using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

namespace Scarlett.UI
{
    public enum ToastType
    {
        SaveComplete,
        LoadComplete,
        SaveFailed,
        LoadFailed,
        NoSaveData,
    }

    public class ToastPanel : UIPanel
    {
        [SerializeField] TMP_Text messageText;
        [SerializeField] float displayDuration = 2f;

        static readonly Dictionary<ToastType, string> Messages = new()
        {
            { ToastType.SaveComplete,  "저장되었습니다."             },
            { ToastType.LoadComplete,  "저장된 정보를 불러옵니다."    },
            { ToastType.SaveFailed,    "저장에 실패했습니다."         },
            { ToastType.LoadFailed,    "불러오기에 실패했습니다."     },
            { ToastType.NoSaveData,    "저장 데이터가 없습니다."      },
        };

        Coroutine _hideCoroutine;

        public void ShowToast(ToastType type)
        {
            if (messageText != null)
                messageText.text = Messages.TryGetValue(type, out var msg) ? msg : type.ToString();

            if (_hideCoroutine != null) StopCoroutine(_hideCoroutine);
            Show();
            _hideCoroutine = StartCoroutine(AutoHide());
        }

        IEnumerator AutoHide()
        {
            yield return new WaitForSeconds(displayDuration);
            Hide();
            _hideCoroutine = null;
        }
    }
}
