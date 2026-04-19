using System;
using System.Collections;
using TMPro;
using UnityEngine;

namespace Scarlett.UI
{
    /// <summary>
    /// 새 게임 시작 시 표시되는 극적 오프닝 시퀀스.
    /// 검은 화면에 5줄 타이프라이터 → 클릭으로 건너뜀 → 완료 시 onComplete 호출.
    /// </summary>
    public class OpeningPanel : UIPanel
    {
        [SerializeField] TMP_Text lineText;
        [SerializeField] TMP_Text clickHintText;   // "Click to Continue" 안내
        [SerializeField] float    fastCharInterval  = 0.04f;
        [SerializeField] float    slowCharInterval  = 0.08f;

        // ─── 피그마 오프닝 라인 정의 ────────────────────────────────
        struct OpeningLine
        {
            public string text;
            public float  pauseAfter;  // 줄 완성 후 대기 시간(초)
            public bool   slow;
        }

        static readonly OpeningLine[] Lines =
        {
            new OpeningLine { text = "1881년 10월, 런던.",          pauseAfter = 1.2f },
            new OpeningLine { text = "베이커 스트리트 221B.",        pauseAfter = 1.2f },
            new OpeningLine { text = "나는 그날을 결코 잊을 수 없다.", pauseAfter = 1.5f },
            new OpeningLine { text = "셜록 홈즈와 함께한...",        pauseAfter = 1.8f, slow = true },
            new OpeningLine { text = "그 끔찍한 사건을.",            pauseAfter = 2.5f },
        };

        Action    _onComplete;
        int       _currentLine;
        bool      _isTyping;
        bool      _completing;
        Coroutine _sequence;

        public void Setup(Action onComplete)
        {
            _onComplete   = onComplete;
            _currentLine  = 0;
            _completing   = false;
            _isTyping     = false;

            if (clickHintText != null) clickHintText.gameObject.SetActive(false);
            if (lineText      != null) lineText.text = string.Empty;

            Show();

            if (_sequence != null) StopCoroutine(_sequence);
            _sequence = StartCoroutine(SequenceRoutine());
        }

        // ─── 스킵 버튼 onClick 에 연결 ──────────────────────────────
        public void OnSkip() => TriggerComplete();

        // ─── 화면 클릭 시 Inspector onClick 에 연결 ─────────────────
        public void OnClick()
        {
            if (_completing) return;

            if (_isTyping)
            {
                // 현재 줄 즉시 완성
                StopCoroutine(_sequence);
                _isTyping = false;
                if (lineText != null) lineText.text = Lines[_currentLine].text;
                _sequence = StartCoroutine(WaitAndAdvance());
            }
            else if (_currentLine < Lines.Length - 1)
            {
                // 다음 줄로 즉시 이동
                StopCoroutine(_sequence);
                _currentLine++;
                _sequence = StartCoroutine(TypeLine(_currentLine, onFinished: AfterLine));
            }
            else
            {
                // 마지막 줄 — 완료
                TriggerComplete();
            }
        }

        // ─── 코루틴 ─────────────────────────────────────────────────

        IEnumerator SequenceRoutine()
        {
            for (_currentLine = 0; _currentLine < Lines.Length; _currentLine++)
            {
                yield return StartCoroutine(TypeLine(_currentLine, null));
                yield return new WaitForSeconds(Lines[_currentLine].pauseAfter);
            }
            TriggerComplete();
        }

        IEnumerator TypeLine(int index, Action onFinished)
        {
            var line     = Lines[index];
            var interval = line.slow ? slowCharInterval : fastCharInterval;

            if (lineText != null) lineText.text = string.Empty;
            if (clickHintText != null) clickHintText.gameObject.SetActive(false);

            _isTyping = true;
            foreach (char c in line.text)
            {
                if (lineText != null) lineText.text += c;
                yield return new WaitForSeconds(interval);
            }
            _isTyping = false;

            if (clickHintText != null && index < Lines.Length - 1)
                clickHintText.gameObject.SetActive(true);

            onFinished?.Invoke();
        }

        IEnumerator WaitAndAdvance()
        {
            yield return new WaitForSeconds(Lines[_currentLine].pauseAfter);

            if (_currentLine < Lines.Length - 1)
            {
                _currentLine++;
                _sequence = StartCoroutine(TypeLine(_currentLine, onFinished: AfterLine));
            }
            else
            {
                TriggerComplete();
            }
        }

        void AfterLine()
        {
            if (_currentLine >= Lines.Length - 1)
            {
                StopCoroutine(_sequence);
                _sequence = StartCoroutine(FinalPauseAndComplete());
            }
        }

        IEnumerator FinalPauseAndComplete()
        {
            if (clickHintText != null) clickHintText.gameObject.SetActive(false);
            yield return new WaitForSeconds(Lines[Lines.Length - 1].pauseAfter);
            TriggerComplete();
        }

        void TriggerComplete()
        {
            if (_completing) return;
            _completing = true;
            if (_sequence != null) { StopCoroutine(_sequence); _sequence = null; }
            Hide();
            _onComplete?.Invoke();
        }
    }
}
