using System;
using UnityEngine;

namespace Scarlett.Story
{
    /// <summary>플래그 스냅샷 (found_secret_passage 등).</summary>
    [Serializable]
    public class StoryFlag
    {
        public string key;
        public bool isActive;
    }

    /// <summary>엔딩 해금 상태.</summary>
    [Serializable]
    public class EndingProgress
    {
        public string endingId;
        public bool isUnlocked;
        public string type;
    }

    /// <summary>저장/런타임에 묶어 두는 진행 묶음.</summary>
    [Serializable]
    public class StoryProgress
    {
        public StoryFlag[] flags;
        public CharacterAxisState[] characterStates;
        public EndingProgress[] endings;
        public ArchiveEntry[] archives;
        public string[] visitedNodeIds;
        public int playCount;
        /// <summary>보유 증거·아이템 ID (분기 Condition.items와 연동).</summary>
        public string[] inventoryItemIds;

        public static StoryProgress CreateEmpty()
        {
            return new StoryProgress
            {
                flags = Array.Empty<StoryFlag>(),
                characterStates = Array.Empty<CharacterAxisState>(),
                endings = Array.Empty<EndingProgress>(),
                archives = Array.Empty<ArchiveEntry>(),
                visitedNodeIds = Array.Empty<string>(),
                inventoryItemIds = Array.Empty<string>(),
                playCount = 0
            };
        }
    }
}
