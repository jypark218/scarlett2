using UnityEngine;
using Scarlett.Story;

namespace Scarlett.UI
{
    /// <summary>
    /// 게임 내 각종 치트 및 디버그 기능을 처리하는 정적 매니저입니다.
    /// </summary>
    public static class CheatManager
    {
        /// <summary>
        /// 모든 게임 데이터를 완전 초기화합니다.
        /// </summary>
        public static void ResetAllData()
        {
            PlayerPrefs.DeleteAll();
            PlayerPrefs.Save();
            Debug.Log("<color=red><b>[Cheat] All PlayerPrefs Deleted.</b></color>");
        }

        /// <summary>
        /// 모든 엔딩을 해금합니다.
        /// </summary>
        public static void UnlockAllEndings()
        {
            // TODO: 실제 데이터 구조에 맞춰 구현 필요
            Debug.Log("[Cheat] Unlock All Endings - Not Implemented Yet");
        }

        /// <summary>
        /// 특정 노드로 점프합니다.
        /// </summary>
        public static void JumpToNode(string nodeId)
        {
            var runner = Object.FindObjectOfType<StoryRunner>();
            if (runner != null)
            {
                // StoryRunner에 Jump 기능을 추가하거나 직접 호출
                Debug.Log($"[Cheat] Jumping to node: {nodeId}");
                // runner.JumpToNode(nodeId); // 필요 시 StoryRunner에 추가
            }
        }
    }
}
