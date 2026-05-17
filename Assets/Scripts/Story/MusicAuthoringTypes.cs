using System;
using UnityEngine;

namespace Scarlett.Story
{
    public enum MusicPriority
    {
        Normal = 0,
        High = 1
    }

    [Serializable]
    public class MusicTrackDefinition
    {
        public string trackId;
        public AudioClip clip;
        [Range(0f, 1f)]
        public float volume = 0.5f;
    }

    [Serializable]
    public class MusicNodeRule
    {
        public string nodeId;
        public string trackId;
        public MusicPriority priority = MusicPriority.Normal;
    }

    [Serializable]
    public class MusicCharacterRule
    {
        public string characterId;
        public string trackId;
    }

    [Serializable]
    public class MusicBackgroundRule
    {
        public string backgroundKey;
        public string trackId;
    }
}
