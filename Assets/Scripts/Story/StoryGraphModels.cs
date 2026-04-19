using System;
using UnityEngine;

namespace Scarlett.Story
{
    /// <summary>선택지 진입 조건.</summary>
    [Serializable]
    public class Condition
    {
        public string[] items;           // 모두 보유해야 표시
        public string[] nodes;           // 모두 방문해야 표시
        public string[] anyNodes;        // 하나라도 방문하면 표시
        public int minPlayCount;
        public string[] blockIfItems;    // 하나라도 보유하면 숨김
        public string[] blockIfNodes;    // 하나라도 방문하면 숨김
        public string[] blockIfAllNodes; // 모두 방문하면 숨김
    }

    /// <summary>선택 직후 적용되는 변화.</summary>
    [Serializable]
    public class Effect
    {
        public string[] flags;
        public string[] itemsGranted;
        public string[] insightsGranted; // 인사이트 획득 (인벤토리에 추가됨)
        public CharacterAxisState[] characterStates;
        public ArchiveEntry[] archives;
        public string[] endingsUnlocked;
    }

    [Serializable]
    public class CharacterAxisState
    {
        public string charId;
        public int value;
        public string axis;
    }

    [Serializable]
    public class ArchiveEntry
    {
        public string type;
        public string targetId;
    }

    [Serializable]
    public class Choice
    {
        public string text;
        public string nextNodeId;
        public Condition req;
        public Effect effect;
        public string puzzleType; // "safe", "well", "mudAnalysis"
    }

    [Serializable]
    public class StoryNode
    {
        public string id;
        public string locationId;
        public string speakerId;
        public string text;
        public Choice[] choices;
        public string nextNodeId;
        public string archiveId;
        public int investigationTier;

        // Figma 변환 필드
        public string backgroundId;
        public int day;
        public string timeOfDay;   // morning / afternoon / evening / night
        public bool isEnding;
        public string endingType;  // good / bad / neutral / true
        public bool shake;
        public string[] grantInsights; // 노드 진입 시 획득하는 인사이트
    }

    [Serializable]
    public class StoryNodeList
    {
        public StoryNode[] nodes;
    }
}
