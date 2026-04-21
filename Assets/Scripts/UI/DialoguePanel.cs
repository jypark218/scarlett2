using System;
using System.Collections;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Scarlett.UI
{
    public class DialoguePanel : UIPanel
    {
        [Header("대사")]
        [SerializeField] TMP_Text speakerText;
        [SerializeField] TMP_Text dialogueText;

        [Header("선택지")]
        [SerializeField] GameObject choiceGroup;
        [SerializeField] Button[]   choiceButtons;

        [Header("타자기 속도 (초/글자)")]
        [SerializeField] float charInterval = 0.05f;

        string    _fullText;
        bool      _isRevealing;
        Coroutine _typewriter;
        Action    _onNext;

        public void SetDialogue(string speaker, string text, Action onNext = null)
        {
            _onNext = onNext;

            if (speakerText != null)
            {
                speakerText.gameObject.SetActive(!string.IsNullOrEmpty(speaker));
                speakerText.text = speaker ?? string.Empty;
            }

            choiceGroup?.SetActive(false);
            Show();

            if (_typewriter != null) StopCoroutine(_typewriter);
            _typewriter = StartCoroutine(TypewriterRoutine(text ?? string.Empty));
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

        /// <summary>다음 버튼 onClick에 연결</summary>
        public void OnNextClicked()
        {
            if (_isRevealing)
            {
                StopTypewriter();
                if (dialogueText != null) dialogueText.text = _fullText;
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
            if (dialogueText != null) dialogueText.text = string.Empty;
            foreach (char c in text)
            {
                if (dialogueText != null) dialogueText.text += c;
                yield return new WaitForSeconds(charInterval);
            }
            _isRevealing = false;
            _typewriter  = null;
        }
    }
}
