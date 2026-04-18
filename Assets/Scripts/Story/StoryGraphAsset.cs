using UnityEngine;

namespace Scarlett.Story
{
    /// <summary>에디터에서 노드 묶음을 에셋으로 들고 있을 때 사용 (JSON과 동일 필드).</summary>
    [CreateAssetMenu(menuName = "Scarlett/Story/Story Graph", fileName = "StoryGraph")]
    public class StoryGraphAsset : ScriptableObject
    {
        public StoryNode[] nodes;
    }
}
