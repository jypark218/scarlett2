using System;
using UnityEngine;

namespace Scarlett.Story
{
    /*
     * 기획 10단계 ↔ 코드 매핑
     * 1 데이터 스키마 — StoryNode, Choice, Condition, Effect, StoryNodeList
     * 2 캐릭터 매칭 — CharacterVisualBinding + CharacterPortraitResolver
     * 3 배경 매핑 — LocationBackgroundRule + BackgroundResolver
     * 4 3단계 조사 — StoryNode.investigationTier + InvestigationTierKind
     * 5 아이템·통찰 — ItemDefinition, InsightDefinition, StoryProgress.inventoryItemIds
     * 6 상태 검증 — ExclusiveFlagGroup + StoryStateValidator
     * 7 심문 압박 — EvidencePressRow + PressReactionResolver
     * 8 서스펜스 — SuspenseEventKind, ISuspenseEventChannel
     * 9 멀티 엔딩 — EndingRouteKey + EndingGateEvaluator
     * 10 통합·디버그 — StoryGraphIntegrityChecker, StoryDebugReport
     */

    /// <summary>4단계 설계: 관찰 → 조사 → 발견.</summary>
    public enum InvestigationTierKind : byte
    {
        None = 0,
        Observe = 1,
        Examine = 2,
        Discover = 3
    }

    [Serializable]
    public class CharacterVisualBinding
    {
        public string speakerId;
        public string displayName;
        public Color nameColor = Color.white;
        public string portraitResourceKey;
    }

    [Serializable]
    public class BackgroundOverride
    {
        public string nodeId;
        public string backgroundKey;
    }

    [Serializable]
    public class LocationBackgroundRule
    {
        public string locationId;
        public string defaultBackgroundKey;
        public BackgroundOverride[] perNode;
    }

    [Serializable]
    public class ItemDefinition
    {
        public string id;
        public string displayName;
        public string archiveType;
    }

    [Serializable]
    public class InsightDefinition
    {
        public string id;
        public string body;
        public string ownerCharId;
        public string[] relatedItemIds;
    }

    /// <summary>6단계: 그룹 내 플래그는 최대 하나만 true (예: 구출 vs 희생).</summary>
    [Serializable]
    public class ExclusiveFlagGroup
    {
        public string groupId;
        public string[] flagKeys;
    }

    /// <summary>7단계: 증거 제시 + 압박 구간 → 반응 노드.</summary>
    [Serializable]
    public class EvidencePressRow
    {
        public string suspectId;
        public string evidenceItemId;
        public int pressMin;
        public int pressMax;
        public string responseNodeId;
    }

    public enum SuspenseEventKind
    {
        Custom = 0,
        PasswordInput = 1,
        ChaseSequence = 2,
        BasementAccess = 3
    }

    /// <summary>9단계: 엔딩 분기 키 (플래그·캐릭터 축 조합은 기획에 맞게 확장).</summary>
    [Serializable]
    public class EndingRouteKey
    {
        public string endingId;
        public string[] requiredActiveFlags;
        public string[] requiredInactiveFlags;
        public CharacterAxisState[] minimumAxes;
    }
}
