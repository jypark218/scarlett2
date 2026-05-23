using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.InputSystem;

namespace Scarlett.UI
{
    public class DialoguePanel : UIPanel
    {
        [Header("대사 / 나레이션")]
        [SerializeField] TMP_Text speakerText;
        [SerializeField] GameObject dialogueGroup;
        [SerializeField] TMP_Text dialogueText;
        [SerializeField] GameObject narrationGroup;
        [SerializeField] TMP_Text narrationText;

        [Header("아이템 정보")]
        [SerializeField] Image itemImage;

        [Header("캐릭터 슬롯 (CharPivot 하위 순서대로)")]
        [SerializeField] DialogueCharacterSlot[] characterSlots;

        [Header("선택지")]
        [SerializeField] GameObject choiceGroup;
        [SerializeField] Button[]   choiceButtons;

        [Header("타자기 속도 (초/글자)")]
        [SerializeField] float charInterval = 0.05f;

        string    _fullText;
        bool      _isRevealing;
        Coroutine _typewriter;
        Action    _onNext;
        TMP_Text  _activeText;

        readonly List<LogEntry> _history = new List<LogEntry>();

        void Awake()
        {
            ClearCharacterSlots();
            if (itemImage != null) itemImage.gameObject.SetActive(false);
            if (dialogueText != null)
            {
                dialogueText.overflowMode = TMPro.TextOverflowModes.Truncate;
                dialogueText.enableAutoSizing = false;
            }
            if (narrationText != null)
            {
                narrationText.overflowMode = TMPro.TextOverflowModes.Truncate;
                narrationText.enableAutoSizing = false;
            }
        }

        void Update()
        {
            // 패널이 활성화되어 있고, 선택지 창이 꺼져 있을 때만 스페이스바 입력 허용
            if (gameObject.activeInHierarchy && (choiceGroup == null || !choiceGroup.activeSelf))
            {
                if (Keyboard.current != null && Keyboard.current.spaceKey.wasPressedThisFrame)
                {
                    OnNextClicked();
                }
            }
        }

        public void SetDialogue(string speakerId, string displayName, string text, Color speakerColor = default, Sprite portrait = null, Action onNext = null)
        {
            _onNext = onNext;

            bool isNarration = string.IsNullOrEmpty(speakerId);

            // UI 그룹 활성화 제어
            dialogueGroup?.SetActive(!isNarration);
            narrationGroup?.SetActive(isNarration);
            _activeText = isNarration ? narrationText : dialogueText;

            if (speakerText != null)
            {
                speakerText.gameObject.SetActive(!isNarration && !string.IsNullOrEmpty(displayName));
                speakerText.text  = displayName ?? string.Empty;
                speakerText.color = speakerColor == default ? Color.white : speakerColor;
            }

            UpdateCharacterSlots(speakerId, portrait);

            // 로그 기록: 나레이션이 아니고 발화자 이름이 있을 때만 기록
            if (!isNarration && !string.IsNullOrEmpty(displayName))
                _history.Add(new LogEntry { Speaker = displayName, Text = text ?? string.Empty, SpeakerColor = speakerColor });

            choiceGroup?.SetActive(false);
            Show();

            if (_typewriter != null) StopCoroutine(_typewriter);
            _typewriter = StartCoroutine(TypewriterRoutine(text ?? string.Empty));
        }

        public void SetItemImage(Sprite sprite)
        {
            if (itemImage == null) return;
            if (sprite == null)
            {
                itemImage.gameObject.SetActive(false);
            }
            else
            {
                itemImage.gameObject.SetActive(true);
                itemImage.sprite = sprite;
            }
        }

        void UpdateCharacterSlots(string speakerId, Sprite portrait)
        {
            if (characterSlots == null || characterSlots.Length == 0) return;

            // 나래이션이거나 이미지가 없는 캐릭터면 슬롯 상태 유지, 포커스만 해제
            if (string.IsNullOrEmpty(speakerId) || portrait == null)
            {
                foreach (var slot in characterSlots)
                    if (slot != null) slot.SetFocus(false);
                return;
            }

            // 이미 이 캐릭터가 들어있는 슬롯 찾기
            DialogueCharacterSlot target = null;
            foreach (var slot in characterSlots)
                if (slot != null && slot.SpeakerId == speakerId) { target = slot; break; }

            // 없으면 빈 슬롯에 배정
            if (target == null)
                foreach (var slot in characterSlots)
                    if (slot != null && string.IsNullOrEmpty(slot.SpeakerId)) { target = slot; break; }

            if (target == null) return;

            target.Assign(speakerId, portrait);

            foreach (var slot in characterSlots)
                if (slot != null) slot.SetFocus(slot == target);
        }

        public void ClearCharacterSlots()
        {
            if (characterSlots == null) return;
            foreach (var slot in characterSlots)
                slot?.Clear();
        }

        public void SetChoices(string[] labels, Action<int> onSelect)
        {
            if (choiceButtons == null) return;

            for (int i = 0; i < choiceButtons.Length; i++)
            {
                var btn = choiceButtons[i];
                if (i < labels.Length)
                {
                    btn.gameObject.SetActive(true);
                    btn.GetComponentInChildren<TMP_Text>().text = labels[i];
                    btn.onClick.RemoveAllListeners();
                    int index = i;
                    btn.onClick.AddListener(() =>
                    {
                        choiceGroup?.SetActive(false);
                        onSelect?.Invoke(index);
                    });
                }
                else
                {
                    btn.gameObject.SetActive(false);
                }
            }

            choiceGroup?.SetActive(true);
        }

        public void OnClickSetting() => GameUI.Instance?.ShowSettingPopup();

        public void OnClickLog() => GameUI.Instance?.ShowLogPanel(_history);

        public void OnNextClicked()
        {
            if (_isRevealing)
            {
                StopTypewriter();
                if (_activeText != null) _activeText.text = _fullText;
            }
            else
            {
                var next = _onNext;
                _onNext = null;
                next?.Invoke();
            }
        }

        void StopTypewriter()
        {
            if (_typewriter != null) { StopCoroutine(_typewriter); _typewriter = null; }
            _isRevealing = false;
        }

        IEnumerator TypewriterRoutine(string text)
        {
            _fullText    = text;
            _isRevealing = true;
            if (_activeText != null) _activeText.text = string.Empty;
            foreach (char c in text)
            {
                if (_activeText != null) _activeText.text += c;
                yield return new WaitForSeconds(charInterval);
            }
            _isRevealing = false;
            _typewriter  = null;
        }
    }
}
