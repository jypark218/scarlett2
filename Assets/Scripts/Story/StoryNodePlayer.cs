using System;
using System.Collections.Generic;
using System.Linq;

namespace Scarlett.Story
{
    /// <summary>
    /// 노드 그래프 위에서 진행 상태를 유지하며,
    /// 조건부 선택지·이펙트·자동 next 이동·방문/아카이브 처리까지 한 번에 이어 줍니다.
    /// UI/Naninovel은 <see cref="Current"/>, <see cref="GetAvailableChoices"/>, 리졸버 출력만 소비하면 됩니다.
    /// </summary>
    public sealed class StoryNodePlayer
    {
        readonly Dictionary<string, StoryNode> _nodes = new(StringComparer.Ordinal);
        readonly CharacterPortraitResolver _portraits;
        readonly BackgroundResolver _backgrounds;

        public StoryProgress Progress { get; }
        public string CurrentNodeId { get; private set; }

        /// <summary>노드에 진입할 때마다 호출 (대사 표시 직전 등).</summary>
        public event Action<StoryNode> NodeEntered;

        public StoryNodePlayer(StoryAuthoringDatabase authoring = null, StoryProgress existingProgress = null)
        {
            Progress = existingProgress ?? StoryProgress.CreateEmpty();
            _portraits = new CharacterPortraitResolver(authoring);
            _backgrounds = new BackgroundResolver(authoring);
        }

        public void SetGraph(IEnumerable<StoryNode> nodes)
        {
            _nodes.Clear();
            CurrentNodeId = null;
            if (nodes == null)
                return;
            foreach (var n in nodes)
            {
                if (n == null || string.IsNullOrEmpty(n.id))
                    continue;
                _nodes[n.id] = n;
            }
        }

        public void SetGraph(StoryNodeList list) => SetGraph(list?.nodes);

        /// <summary>JSON 루트가 { "nodes": [...] } 일 때.</summary>
        public static StoryNodeList ParseNodeListJson(string json) => StoryGraphJsonUtility.ListFromJson(json);

        /// <summary>단일 노드 JSON을 그래프 한 칸으로 넣을 때.</summary>
        public void SetSingleNodeFromJson(string json)
        {
            var node = StoryGraphJsonUtility.NodeFromJson(json);
            SetGraph(new[] { node });
        }

        public StoryNode Current =>
            string.IsNullOrEmpty(CurrentNodeId) || !_nodes.TryGetValue(CurrentNodeId, out var n) ? null : n;

        public bool TryEnter(string nodeId)
        {
            if (string.IsNullOrEmpty(nodeId) || !_nodes.ContainsKey(nodeId))
                return false;
            CurrentNodeId = nodeId;
            Progress.playCount++;
            AppendUnique(ref Progress.visitedNodeIds, nodeId);
            ApplyNodeArchive(Current);
            NodeEntered?.Invoke(Current);
            return true;
        }

        /// <summary>시작 노드 진입 후, 선택지 없는 선형 구간만큼 자동 전진.</summary>
        public bool TryStart(string startNodeId, int maxAutoHops = 32)
        {
            if (!TryEnter(startNodeId))
                return false;
            FollowAutoNextChain(maxAutoHops);
            return true;
        }

        /// <summary>선택 가능한 분기만 반환 (req 미충족 제외).</summary>
        public IReadOnlyList<Choice> GetAvailableChoices()
        {
            var node = Current;
            if (node?.choices == null || node.choices.Length == 0)
                return Array.Empty<Choice>();
            return node.choices.Where(c => c != null && StoryConditionEvaluator.Meets(c.req, Progress)).ToList();
        }

        /// <summary>조건을 통과한 선택지 목록에서 인덱스로 진행.</summary>
        public bool TrySelectAvailableChoice(int visibleIndex)
        {
            var list = GetAvailableChoices();
            if (visibleIndex < 0 || visibleIndex >= list.Count)
                return false;
            return TrySelectChoice(list[visibleIndex]);
        }

        public bool TrySelectChoice(Choice choice)
        {
            if (choice == null || !StoryConditionEvaluator.Meets(choice.req, Progress))
                return false;
            StoryEffectApplier.Apply(Progress, choice.effect);
            if (string.IsNullOrEmpty(choice.nextNodeId))
                return true;
            return TryEnter(choice.nextNodeId);
        }

        /// <summary>선택지가 없고 <see cref="StoryNode.nextNodeId"/>만 있을 때 연쇄 이동.</summary>
        public int FollowAutoNextChain(int maxHops = 32)
        {
            var hops = 0;
            while (hops < maxHops)
            {
                var node = Current;
                if (node == null)
                    break;
                var hasChoice = node.choices != null && node.choices.Length > 0;
                if (hasChoice)
                    break;
                if (string.IsNullOrEmpty(node.nextNodeId))
                    break;
                if (!TryEnter(node.nextNodeId))
                    break;
                hops++;
            }
            return hops;
        }

        public CharacterVisualBinding ResolveSpeaker() =>
            _portraits.Resolve(Current?.speakerId);

        public string ResolveBackgroundKey() =>
            _backgrounds.Resolve(Current);

        static void AppendUnique(ref string[] arr, string id)
        {
            var list = new List<string>(arr ?? Array.Empty<string>());
            if (!list.Exists(x => string.Equals(x, id, StringComparison.Ordinal)))
                list.Add(id);
            arr = list.ToArray();
        }

        void ApplyNodeArchive(StoryNode node)
        {
            if (node == null || string.IsNullOrEmpty(node.archiveId))
                return;
            var list = new List<ArchiveEntry>(Progress.archives ?? Array.Empty<ArchiveEntry>());
            var entry = new ArchiveEntry { type = "node", targetId = node.archiveId };
            if (!list.Any(x =>
                    string.Equals(x.type, entry.type, StringComparison.Ordinal) &&
                    string.Equals(x.targetId, entry.targetId, StringComparison.Ordinal)))
                list.Add(entry);
            Progress.archives = list.ToArray();
        }
    }
}
