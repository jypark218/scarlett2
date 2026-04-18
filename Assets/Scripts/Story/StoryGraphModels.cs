using System;
using UnityEngine;

namespace Scarlett.Story
{
    /// <summary>선택지 진입 조건: 아이템 보유, 노드 방문, 최소 재생 횟수.</summary>
    [Serializable]
    public class Condition
    {
        public string[] items;
        public string[] nodes;
        public int minPlayCount;
    }

    /// <summary>선택 직후 적용되는 변화. JSON에서는 필드를 생략해도 됩니다.</summary>
    [Serializable]
    public class Effect
    {
        public string[] flags;
        public string[] itemsGranted;
        public CharacterAxisState[] characterStates;
        public ArchiveEntry[] archives;
        public string[] endingsUnlocked;
    }

    /// <summary>감정·신뢰 등 축별 수치. Effect에 넣을 때는 목표 절대값으로 해석합니다.</summary>
    [Serializable]
    public class CharacterAxisState
    {
        public string charId;
        public int value;
        public string axis;
    }

    /// <summary>도감/아카이브 한 칸 해금.</summary>
    [Serializable]
    public class ArchiveEntry
    {
        public string type;
        public string targetId;
    }

    /// <summary>한 줄 선택지.</summary>
    [Serializable]
    public class Choice
    {
        public string text;
        public string nextNodeId;
        public Condition req;
        public Effect effect;
    }

    /// <summary>게임 최소 단위 노드. nextNodeId만 있으면 선택 없이 자동 이동 처리 가능.</summary>
    [Serializable]
    public class StoryNode
    {
        public string id;
        public string locationId;
        public string speakerId;
        public string text;
        public Choice[] choices;
        public string nextNodeId;
        /// <summary>이 노드 대사를 읽으면 아카이브에 반영할 때 사용 (기획 팁).</summary>
        public string archiveId;
        /// <summary>3단계 조사: 0=미사용, 1=관찰, 2=조사, 3=발견 (탐색 밀도·UI 단계 분리).</summary>
        public int investigationTier;
    }

    /// <summary>여러 노드를 한 파일에 넣을 때 루트 래퍼 (JsonUtility용).</summary>
    [Serializable]
    public class StoryNodeList
    {
        public StoryNode[] nodes;
    }
}
