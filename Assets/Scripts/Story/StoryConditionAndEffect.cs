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

            if (condition.items != null && condition.items.Length > 0)
            {
                var inv = ToSet(progress.inventoryItemIds);
                foreach (var id in condition.items)
                {
                    if (string.IsNullOrEmpty(id))
                        continue;
                    if (!inv.Contains(id))
                        return false;
                }
            }

            if (condition.nodes != null && condition.nodes.Length > 0)
            {
                var vis = ToSet(progress.visitedNodeIds);
                foreach (var id in condition.nodes)
                {
                    if (string.IsNullOrEmpty(id))
                        continue;
                    if (!vis.Contains(id))
                        return false;
                }
            }

            return true;
        }

        static HashSet<string> ToSet(string[] arr)
        {
            var set = new HashSet<string>(StringComparer.Ordinal);
            if (arr == null)
                return set;
            foreach (var s in arr)
            {
                if (!string.IsNullOrEmpty(s))
                    set.Add(s);
            }
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
                    if (string.IsNullOrEmpty(key))
                        continue;
                    UpsertFlag(list, key, true);
                }
                progress.flags = list.ToArray();
            }

            if (effect.itemsGranted != null && effect.itemsGranted.Length > 0)
            {
                var inv = new List<string>(progress.inventoryItemIds ?? Array.Empty<string>());
                foreach (var id in effect.itemsGranted)
                {
                    if (string.IsNullOrEmpty(id))
                        continue;
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
                    if (st == null || string.IsNullOrEmpty(st.charId) || string.IsNullOrEmpty(st.axis))
                        continue;
                    var idx = axes.FindIndex(x =>
                        string.Equals(x.charId, st.charId, StringComparison.Ordinal) &&
                        string.Equals(x.axis, st.axis, StringComparison.Ordinal));
                    if (idx >= 0)
                        axes[idx] = st;
                    else
                        axes.Add(st);
                }
                progress.characterStates = axes.ToArray();
            }

            if (effect.archives != null && effect.archives.Length > 0)
            {
                var arc = new List<ArchiveEntry>(progress.archives ?? Array.Empty<ArchiveEntry>());
                foreach (var a in effect.archives)
                {
                    if (a == null || string.IsNullOrEmpty(a.targetId))
                        continue;
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
                    if (string.IsNullOrEmpty(eid))
                        continue;
                    var idx = ends.FindIndex(x => x.endingId == eid);
                    if (idx >= 0)
                    {
                        ends[idx].isUnlocked = true;
                    }
                    else
                    {
                        ends.Add(new EndingProgress { endingId = eid, isUnlocked = true, type = string.Empty });
                    }
                }
                progress.endings = ends.ToArray();
            }
        }

        static void UpsertFlag(List<StoryFlag> list, string key, bool active)
        {
            var idx = list.FindIndex(f => f != null && f.key == key);
            if (idx >= 0)
                list[idx] = new StoryFlag { key = key, isActive = active };
            else
                list.Add(new StoryFlag { key = key, isActive = active });
        }
    }
}
