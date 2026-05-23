using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System.Collections.Generic;

namespace Scarlett.UI
{
    /// <summary>
    /// CLI(Command Line Interface) 스타일의 치트 콘솔 패널입니다.
    /// F1 키로 토글하며 명령어를 입력하여 치트를 실행합니다.
    /// </summary>
    public class CheatPanel : UIPanel
    {
        [Header("UI References")]
        [SerializeField] TMP_InputField commandInput;
        [SerializeField] TextMeshProUGUI logText;
        [SerializeField] ScrollRect scrollRect;

        void OnEnable()
        {
            if (commandInput != null)
            {
                commandInput.text = "";
                commandInput.ActivateInputField(); // 패널이 켜지면 인풋 필드에 포커스
                
                // 이벤트 중복 등록 방지를 위해 먼저 제거 후 등록
                commandInput.onSubmit.RemoveListener(OnInputFieldSubmit);
                commandInput.onSubmit.AddListener(OnInputFieldSubmit);
            }
        }

        void OnDisable()
        {
            if (commandInput != null)
            {
                commandInput.onSubmit.RemoveListener(OnInputFieldSubmit);
            }
        }

        void OnInputFieldSubmit(string text)
        {
            // InputField에서 엔터를 눌렀을 때 호출됨
            OnSubmitCommand();
        }

        void Update()
        {
            // 엔터 키 입력 시 명령어 제출 (New Input System 대응 - onSubmit이 작동하지 않을 경우를 대비한 보조 로직)
            var kb = UnityEngine.InputSystem.Keyboard.current;
            if (kb != null && (kb.enterKey.wasPressedThisFrame || kb.numpadEnterKey.wasPressedThisFrame))
            {
                if (commandInput != null && commandInput.isFocused)
                {
                    OnSubmitCommand();
                }
            }
        }

        public void OnSubmitCommand()
        {
            if (commandInput == null || string.IsNullOrWhiteSpace(commandInput.text)) return;

            string cmd = commandInput.text.Trim();
            commandInput.text = "";
            commandInput.ActivateInputField(); // 입력 후 다시 포커스

            ProcessCommand(cmd);
        }

        void ProcessCommand(string input)
        {
            Log($"<color=#AAAAAA>> {input}</color>");

            string[] parts = input.Split(' ');
            if (parts.Length == 0) return;

            string cmd = parts[0].ToLower();

            switch (cmd)
            {
                case "help":
                    Log("사용 가능한 명령어:");
                    Log(" - <color=#FFFF00>help</color>: 명령어 목록 표시");
                    Log(" - <color=#FFFF00>reset</color>: 모든 게임 데이터 초기화 및 타이틀로 이동");
                    Log(" - <color=#FFFF00>unlock_endings</color>: 모든 엔딩 강제 해금");
                    Log(" - <color=#FFFF00>clear</color>: 콘솔 로그 비우기");
                    break;

                case "reset":
                    Log("<color=#FF0000>모든 데이터를 초기화 중...</color>");
                    CheatManager.ResetAllData();
                    Log("초기화 완료. 타이틀 화면으로 이동합니다.");
                    GameUI.Instance?.GoToTitle();
                    break;

                case "unlock_endings":
                    Log("모든 엔딩을 해금 중...");
                    CheatManager.UnlockAllEndings();
                    Log("엔딩 해금이 완료되었습니다.");
                    break;

                case "clear":
                    if (logText != null) logText.text = "";
                    break;

                default:
                    Log($"<color=#FF5555>알 수 없는 명령어: '{cmd}'. 'help'를 입력해 목록을 확인하세요.</color>");
                    break;
            }
        }

        public void Log(string message)
        {
            if (logText == null) return;

            logText.text += message + "\n";
            
            // 스크롤을 최하단으로 이동
            Canvas.ForceUpdateCanvases();
            if (scrollRect != null && scrollRect.content != null)
            {
                scrollRect.verticalNormalizedPosition = 0f;
            }
        }

        public override void OnClickClose()
        {
            Hide();
        }
    }
}
