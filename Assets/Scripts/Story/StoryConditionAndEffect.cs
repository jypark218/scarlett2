using System;
using System.Collections.Generic;
using System.Linq;

namespace Scarlett.Story
{
    public static class StoryConditionEvaluator
    {
        public static bool Meets(Condition condition, StoryProgress progress)
        {
            if (condition == null)
                return true;

            if (progress.playCount < condition.minPlayCount)
                return false;

            var inv = ToSet(progress.inventoryItemIds);
            var vis = ToSet(progress.visitedNodeIds);

            // 아이템 전체 보유 조건
            if (condition.items != null && condition.items.Length > 0)
            {
                foreach (var id in condition.items)
                    if (!string.IsNullOrEmpty(id) && !inv.Contains(id))
                        return false;
            }

            // 노드 전체 방문 조건
            if (condition.nodes != null && condition.nodes.Length > 0)
            {
                foreach (var id in condition.nodes)
                    if (!string.IsNullOrEmpty(id) && !vis.Contains(id))
                        return false;
            }

            // 노드 하나라도 방문 조건
            if (condition.anyNodes != null && condition.anyNodes.Length > 0)
            {
                var any = false;
                foreach (var id in condition.anyNodes)
                    if (!string.IsNullOrEmpty(id) && vis.Contains(id)) { any = true; break; }
                if (!any) return false;
            }

            // 아이템 보유 시 숨김
            if (condition.blockIfItems != null)
            {
                foreach (var id in condition.blockIfItems)
                    if (!string.IsNullOrEmpty(id) && inv.Contains(id))
                        return false;
            }

            // 노드 방문 시 숨김 (하나라도)
            if (condition.blockIfNodes != null)
            {
                foreach (var id in condition.blockIfNodes)
                    if (!string.IsNullOrEmpty(id) && vis.Contains(id))
                        return false;
            }

            // 노드 전체 방문 시 숨김
            if (condition.blockIfAllNodes != null && condition.blockIfAllNodes.Length > 0)
            {
                var all = true;
                foreach (var id in condition.blockIfAllNodes)
                    if (!string.IsNullOrEmpty(id) && !vis.Contains(id)) { all = false; break; }
                if (all) return false;
            }

            return true;
        }

        static HashSet<string> ToSet(string[] arr)
        {
            var set = new HashSet<string>(StringComparer.Ordinal);
            if (arr != null)
                foreach (var s in arr)
                    if (!string.IsNullOrEmpty(s))
                        set.Add(s);
            return set;
        }
    }

    public static class StoryEffectApplier
    {
        public static void Apply(StoryProgress progress, Effect effect)
        {
            if (effect == null || progress == null)
                return;

            if (effect.flags != null)
            {
                var list = new List<StoryFlag>(progress.flags ?? Array.Empty<StoryFlag>());
                foreach (var key in effect.flags)
                {
                    if (string.IsNullOrEmpty(key)) continue;
                    UpsertFlag(list, key, true);
                }
                progress.flags = list.ToArray();
            }

            // 아이템 + 인사이트 모두 inventoryItemIds로 관리
            var itemsToAdd = new List<string>();
            if (effect.itemsGranted != null)
                itemsToAdd.AddRange(effect.itemsGranted);
            if (effect.insightsGranted != null)
                itemsToAdd.AddRange(effect.insightsGranted);

            if (itemsToAdd.Count > 0)
            {
                var inv = new List<string>(progress.inventoryItemIds ?? Array.Empty<string>());
                foreach (var id in itemsToAdd)
                {
                    if (string.IsNullOrEmpty(id)) continue;
                    if (!inv.Exists(x => string.Equals(x, id, StringComparison.Ordinal)))
                        inv.Add(id);
                }
                progress.inventoryItemIds = inv.ToArray();
            }

            if (effect.characterStates != null && effect.characterStates.Length > 0)
            {
                var axes = new List<CharacterAxisState>(progress.characterStates ?? Array.Empty<CharacterAxisState>());
                foreach (var st in effect.characterStates)
                {
                    if (st == null || string.IsNullOrEmpty(st.charId) || string.IsNullOrEmpty(st.axis)) continue;
                    var idx = axes.FindIndex(x =>
                        string.Equals(x.charId, st.charId, StringComparison.Ordinal) &&
                        string.Equals(x.axis, st.axis, StringComparison.Ordinal));
                    if (idx >= 0) axes[idx] = st;
                    else axes.Add(st);
                }
                progress.characterStates = axes.ToArray();
            }

            if (effect.archives != null && effect.archives.Length > 0)
            {
                var arc = new List<ArchiveEntry>(progress.archives ?? Array.Empty<ArchiveEntry>());
                foreach (var a in effect.archives)
                {
                    if (a == null || string.IsNullOrEmpty(a.targetId)) continue;
                    if (!arc.Any(x => x.type == a.type && x.targetId == a.targetId))
                        arc.Add(a);
                }
                progress.archives = arc.ToArray();
            }

            if (effect.endingsUnlocked != null && effect.endingsUnlocked.Length > 0)
            {
                var ends = new List<EndingProgress>(progress.endings ?? Array.Empty<EndingProgress>());
                foreach (var eid in effect.endingsUnlocked)
                {
                    if (string.IsNullOrEmpty(eid)) continue;
                    var idx = ends.FindIndex(x => x.endingId == eid);
                    if (idx >= 0)
                        ends[idx].isUnlocked = true;
                    else
                        ends.Add(new EndingProgress { endingId = eid, isUnlocked = true, type = string.Empty });
                }
                progress.endings = ends.ToArray();
            }
        }

        static void UpsertFlag(List<StoryFlag> list, string key, bool active)
        {
            var idx = list.FindIndex(f => f != null && f.key == key);
            if (idx >= 0) list[idx] = new StoryFlag { key = key, isActive = active };
            else list.Add(new StoryFlag { key = key, isActive = active });
        }
    }
}
