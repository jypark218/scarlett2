using System;
using UnityEngine;

namespace Scarlett.Story
{
    [Serializable]
    public class StoryFlag
    {
        public string key;
        public bool isActive;
    }

    [Serializable]
    public class EndingProgress
    {
        public string endingId;
        public bool isUnlocked;
        public string type;
    }

    [Serializable]
    public class StoryProgress
    {
        public StoryFlag[] flags;
        public CharacterAxisState[] characterStates;
        public EndingProgress[] endings;
        public ArchiveEntry[] archives;
        public string[] visitedNodeIds;
        public int playCount;
        public string[] inventoryItemIds; // 아이템 + 인사이트 통합 보관

        public static StoryProgress CreateEmpty()
        {
            return new StoryProgress
            {
                flags             = Array.Empty<StoryFlag>(),
                characterStates   = Array.Empty<CharacterAxisState>(),
                endings           = Array.Empty<EndingProgress>(),
                archives          = Array.Empty<ArchiveEntry>(),
                visitedNodeIds    = Array.Empty<string>(),
                inventoryItemIds  = Array.Empty<string>(),
                playCount         = 0
            };
        }
    }
}
