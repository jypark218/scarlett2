using System.Collections.Generic;

namespace Scarlett.UI
{
    public enum PopupMessageType
    {
        SaveConfirm,
        LoadConfirm,
        GoTitleConfirm,
    }

    public struct PopupMessageData
    {
        public string Title;
        public string Desc;
        public string Confirm;
        public string Cancel;
    }

    public static class PopupMessageDatabase
    {
        public static readonly Dictionary<PopupMessageType, PopupMessageData> All = new()
        {
            {
                PopupMessageType.SaveConfirm, new PopupMessageData
                {
                    Title   = "저장",
                    Desc    = "이미 저장된 데이터가 있습니다.\n덮어쓸까요?",
                    Confirm = "저장",
                    Cancel  = "취소",
                }
            },
            {
                PopupMessageType.LoadConfirm, new PopupMessageData
                {
                    Title   = "불러오기",
                    Desc    = "현재 진행 상황이 초기화됩니다.\n계속하시겠습니까?",
                    Confirm = "불러오기",
                    Cancel  = "취소",
                }
            },
            {
                PopupMessageType.GoTitleConfirm, new PopupMessageData
                {
                    Title   = "타이틀로 돌아가기",
                    Desc    = "저장하지 않은 내용은 사라집니다.\n계속하시겠습니까?",
                    Confirm = "확인",
                    Cancel  = "취소",
                }
            },
        };
    }
}
