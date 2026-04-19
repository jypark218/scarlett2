using System.Collections.Generic;
using UnityEngine;

namespace Scarlett.UI
{
    public class GameUI : MonoBehaviour
    {
        public static GameUI Instance { get; private set; }

        [Header("루트")]
        [SerializeField] Transform rootUI;

        [Header("프리팹 연결")]
        [SerializeField] DialoguePanel dialoguePanelPrefab;
        [SerializeField] IntroPanel    introPanelPrefab;
        [SerializeField] PopupPanel    popupPanelPrefab;
        [SerializeField] OpeningPanel  openingPanelPrefab;

        DialoguePanel _dialogue;
        IntroPanel    _intro;
        OpeningPanel  _opening;

        readonly Stack<PopupPanel> _popupStack = new Stack<PopupPanel>();

        void Awake()
        {
            if (Instance != null) { Destroy(gameObject); return; }
            Instance = this;
            if (rootUI == null) rootUI = transform;
        }

        public DialoguePanel Dialogue { get { if (_dialogue == null) _dialogue = Spawn(dialoguePanelPrefab); return _dialogue; } }
        public IntroPanel    Intro    { get { if (_intro    == null) _intro    = Spawn(introPanelPrefab);    return _intro;    } }
        public OpeningPanel  Opening  { get { if (_opening  == null) _opening  = Spawn(openingPanelPrefab);  return _opening;  } }

        public PopupPanel ShowPopup(string message, string confirm = "확인", string cancel = null,
                                    System.Action onConfirm = null, System.Action onCancel = null)
        {
            if (popupPanelPrefab == null) { Debug.LogError("[GameUI] PopupPanel 프리팹 없음"); return null; }
            var popup = Spawn(popupPanelPrefab);
            popup.Setup(message, confirm, cancel, onConfirm, onCancel);
            popup.Show();
            _popupStack.Push(popup);
            return popup;
        }

        public void CloseTopPopup()
        {
            if (_popupStack.Count > 0) _popupStack.Pop().Hide();
        }

        T Spawn<T>(T prefab) where T : UIPanel
        {
            if (prefab == null) { Debug.LogError($"[GameUI] {typeof(T).Name} 프리팹 없음"); return null; }
            var instance = Instantiate(prefab, rootUI);
            instance.gameObject.SetActive(false);
            return instance;
        }
    }
}
