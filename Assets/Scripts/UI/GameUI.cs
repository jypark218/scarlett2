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
        [SerializeField] SettingPanel      settingPopupPrefab;
        [SerializeField] SaveStoryPanel    saveStoryPanelPrefab;
        [SerializeField] ToastPanel        toastPanelPrefab;
        [SerializeField] MessagePopupPanel messagePopupPrefab;

        DialoguePanel      _dialogue;
        IntroPanel         _intro;
        OpeningPanel       _opening;
        SettingPanel       _settingPopup;
        SaveStoryPanel     _saveStoryPanel;
        ToastPanel         _toast;
        MessagePopupPanel  _messagePopup;

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

        public void ShowSettingPopup()
        {
            if (_settingPopup == null)
            {
                if (settingPopupPrefab == null) { Debug.LogError("[GameUI] SettingPopup 프리팹 없음"); return; }
                _settingPopup = Spawn(settingPopupPrefab);
            }
            _settingPopup.Show();
        }

        public void ShowSaveStoryPanel(bool saveMode, Scarlett.Story.StoryRunner runner)
        {
            if (_saveStoryPanel == null)
            {
                if (saveStoryPanelPrefab == null) { Debug.LogError("[GameUI] SaveStoryPanel 프리팹 없음"); return; }
                _saveStoryPanel = Spawn(saveStoryPanelPrefab);
            }
            if (saveMode) _saveStoryPanel.OpenForSave(runner);
            else          _saveStoryPanel.OpenForLoad();

        }

        public void GoToTitle()
        {
            _settingPopup?.Hide();
            _dialogue?.Hide();
            var runner = FindObjectOfType<Scarlett.Story.StoryRunner>();
            Intro.Setup(
                onStart:    () => runner?.StartNewGame(),
                onContinue: Scarlett.Story.StoryRunner.HasSave ? (System.Action)(() => runner?.ContinueGame()) : null
            );
        }

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

        public void ShowMessagePopup(PopupMessageType type, System.Action onConfirm = null, System.Action onCancel = null)
        {
            if (_messagePopup == null)
            {
                if (messagePopupPrefab == null) { Debug.LogError("[GameUI] MessagePopupPanel 프리팹 없음"); return; }
                _messagePopup = Spawn(messagePopupPrefab);
            }
            _messagePopup.Setup(type, onConfirm, onCancel);
        }

        public void ShowToast(ToastType type)
        {
            if (_toast == null)
            {
                if (toastPanelPrefab == null) { Debug.LogError("[GameUI] ToastPanel 프리팹 없음"); return; }
                _toast = Spawn(toastPanelPrefab);
            }
            _toast.ShowToast(type);
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
