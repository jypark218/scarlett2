using UnityEngine;

namespace Scarlett.Story
{
    /// <summary>2~9단계용 기획 데이터 묶음 (에디터에서 채우고 런타임 리졸버가 참조).</summary>
    [CreateAssetMenu(menuName = "Scarlett/Story/Authoring Database", fileName = "StoryAuthoringDatabase")]
    public class StoryAuthoringDatabase : ScriptableObject
    {
        public CharacterVisualBinding[] characters;
        public LocationBackgroundRule[] locations;
        public ItemDefinition[] items;
        public InsightDefinition[] insights;
        public ExclusiveFlagGroup[] exclusiveFlagGroups;
        public EvidencePressRow[] crossExaminationRows;
        public EndingRouteKey[] endingRoutes;
    }
}
