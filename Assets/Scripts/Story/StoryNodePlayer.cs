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
        readonly MusicResolver _music;
        string _firstNodeId;

        public StoryProgress Progress { get; }
        public string CurrentNodeId { get; private set; }

        /// <summary>노드에 진입할 때마다 호출 (대사 표시 직전 등).</summary>
        public event Action<StoryNode> NodeEntered;

        public StoryNodePlayer(StoryAuthoringDatabase authoring = null, StoryProgress existingProgress = null)
        {
            Progress = existingProgress ?? StoryProgress.CreateEmpty();
            _portraits = new CharacterPortraitResolver(authoring);
            _backgrounds = new BackgroundResolver(authoring);
            _music = new MusicResolver(authoring);
        }

        public void SetGraph(IEnumerable<StoryNode> nodes)
        {
            _nodes.Clear();
            _firstNodeId = null;
            CurrentNodeId = null;
            if (nodes == null) return;

            int total = 0, skipped = 0;
            foreach (var n in nodes)
            {
                total++;
                if (n == null || string.IsNullOrEmpty(n.id)) { skipped++; continue; }
                _nodes[n.id] = n;
                if (_firstNodeId == null) _firstNodeId = n.id;
            }
            UnityEngine.Debug.Log($"[StoryNodePlayer] SetGraph: 전체 {total}, 등록 {_nodes.Count}, 스킵(id없음) {skipped}");
            if (_nodes.Count > 0)
            {
                var first3 = string.Join(", ", System.Linq.Enumerable.Take(_nodes.Keys, 3));
                UnityEngine.Debug.Log($"[StoryNodePlayer] 첫 노드 ids: {first3}");
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

        public StoryNode GetNode(string nodeId)
        {
            if (string.IsNullOrEmpty(nodeId)) return null;
            _nodes.TryGetValue(nodeId, out var node);
            return node;
        }

        public string GetFirstNodeId()
        {
            return _firstNodeId;
        }

        public bool TryEnter(string nodeId)
        {
            if (string.IsNullOrEmpty(nodeId) || !_nodes.ContainsKey(nodeId))
                return false;
            CurrentNodeId = nodeId;
            Progress.playCount++;
            AppendUnique(ref Progress.visitedNodeIds, nodeId);
            ApplyNodeArchive(Current);
            ApplyNodeInsights(Current);
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

        /// <summary>선택 가능한 분기만 반환 (req 미충족 제외 및 이미 방문한 노드 필터링).</summary>
        public IReadOnlyList<Choice> GetAvailableChoices()
        {
            var node = Current;
            if (node?.choices == null || node.choices.Length == 0)
                return Array.Empty<Choice>();

            var baseChoices = node.choices.Where(c => c != null && StoryConditionEvaluator.Meets(c.req, Progress)).ToList();

            // 이미 방문한 노드로 가는 선택지는 숨김 처리 (단서를 이미 얻었거나 확인한 내용 중복 방지)
            var filtered = baseChoices.Where(c =>
            {
                if (string.IsNullOrEmpty(c.nextNodeId)) return true;
                return !Array.Exists(Progress.visitedNodeIds ?? Array.Empty<string>(), id => id == c.nextNodeId);
            }).ToList();

            // 모든 선택지를 이미 방문했다면 다시 전체를 보여줌 (진행 불가 방지)
            return filtered.Count > 0 ? filtered : baseChoices;
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

        public string ResolveMusicTrackId() =>
            _music.Resolve(Current, ResolveBackgroundKey());

        public MusicTrackDefinition GetMusicTrackDefinition(string trackId) =>
            _music.GetTrackDefinition(trackId);

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

        void ApplyNodeInsights(StoryNode node)
        {
            if (node?.grantInsights == null || node.grantInsights.Length == 0)
                return;
            var inv = new List<string>(Progress.inventoryItemIds ?? System.Array.Empty<string>());
            foreach (var id in node.grantInsights)
            {
                if (string.IsNullOrEmpty(id)) continue;
                if (!inv.Exists(x => string.Equals(x, id, StringComparison.Ordinal)))
                    inv.Add(id);
            }
            Progress.inventoryItemIds = inv.ToArray();
        }
    }
}
