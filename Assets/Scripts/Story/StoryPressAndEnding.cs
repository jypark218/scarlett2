using System;
using System.Linq;

namespace Scarlett.Story
{
    /// <summary>7단계: 압박 수치로 심문 반응 노드 선택.</summary>
    public sealed class PressReactionResolver
    {
        readonly StoryAuthoringDatabase db;

        public PressReactionResolver(StoryAuthoringDatabase database) => db = database;

        public string ResolveResponseNode(string suspectId, string evidenceItemId, int currentPressLevel)
        {
            if (db?.crossExaminationRows == null || string.IsNullOrEmpty(suspectId) || string.IsNullOrEmpty(evidenceItemId))
                return null;

            var row = db.crossExaminationRows.FirstOrDefault(r =>
                r != null &&
                string.Equals(r.suspectId, suspectId, StringComparison.Ordinal) &&
                string.Equals(r.evidenceItemId, evidenceItemId, StringComparison.Ordinal) &&
                currentPressLevel >= r.pressMin &&
                currentPressLevel <= r.pressMax);

            return row?.responseNodeId;
        }
    }

    /// <summary>9단계: 단순 게이트 — 필요 플래그·비활성 플래그·최소 축 값.</summary>
    public sealed class EndingGateEvaluator
    {
        readonly StoryAuthoringDatabase db;

        public EndingGateEvaluator(StoryAuthoringDatabase database) => db = database;

        public string EvaluateFirstMatch(StoryProgress progress)
        {
            if (db?.endingRoutes == null || progress == null)
                return null;

            foreach (var route in db.endingRoutes)
            {
                if (route == null || string.IsNullOrEmpty(route.endingId))
                    continue;
                if (Meets(route, progress))
                    return route.endingId;
            }

            return null;
        }

        static bool Meets(EndingRouteKey route, StoryProgress progress)
        {
            var active = new System.Collections.Generic.HashSet<string>(StringComparer.Ordinal);
            if (progress.flags != null)
            {
                foreach (var f in progress.flags)
                {
                    if (f != null && f.isActive && !string.IsNullOrEmpty(f.key))
                        active.Add(f.key);
                }
            }

            if (route.requiredActiveFlags != null)
            {
                foreach (var k in route.requiredActiveFlags)
                {
                    if (string.IsNullOrEmpty(k))
                        continue;
                    if (!active.Contains(k))
                        return false;
                }
            }

            if (route.requiredInactiveFlags != null)
            {
                foreach (var k in route.requiredInactiveFlags)
                {
                    if (string.IsNullOrEmpty(k))
                        continue;
                    if (active.Contains(k))
                        return false;
                }
            }

            if (route.minimumAxes != null && progress.characterStates != null)
            {
                foreach (var need in route.minimumAxes)
                {
                    if (need == null || string.IsNullOrEmpty(need.charId) || string.IsNullOrEmpty(need.axis))
                        continue;
                    var actual = progress.characterStates.FirstOrDefault(c =>
                        c != null &&
                        string.Equals(c.charId, need.charId, StringComparison.Ordinal) &&
                        string.Equals(c.axis, need.axis, StringComparison.Ordinal));
                    if (actual == null || actual.value < need.value)
                        return false;
                }
            }

            return true;
        }
    }

    /// <summary>8단계: UI/연출 쪽에서 구독할 채널 스텁 (비밀번호, 추격 등).</summary>
    public interface ISuspenseEventChannel
    {
        void Raise(SuspenseEventKind kind, string payloadId);
    }

    public sealed class NullSuspenseEventChannel : ISuspenseEventChannel
    {
        public void Raise(SuspenseEventKind kind, string payloadId) { }
    }
}
