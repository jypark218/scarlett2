using System;

namespace Scarlett.Story
{
    [Serializable]
    public class SaveSlotData
    {
        public int           slotIndex;
        public string        storyJsonPath;
        public string        currentNodeId;
        public string        title;
        public string        saveTime;
        public StoryProgress progress;

        public bool IsEmpty => string.IsNullOrEmpty(currentNodeId);
    }
}
