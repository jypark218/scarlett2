using System;
using System.Collections.Generic;
using System.Linq;

namespace Scarlett.Story
{
    /// <summary>10단계: 그래프 끊김·빈 참조 검사 (대사 밸리데이터의 C# 측 최소판).</summary>
    public static class StoryGraphIntegrityChecker
    {
        const string EndToken = "END";

        public static StoryDebugReport BuildReport(StoryNode[] nodes)
        {
            var issues = new List<string>();
            if (nodes == null || nodes.Length == 0)
            {
                issues.Add("No nodes in graph.");
                return new StoryDebugReport(issues);
            }

            var ids = new HashSet<string>(StringComparer.Ordinal);
            foreach (var n in nodes)
            {
                if (n == null || string.IsNullOrEmpty(n.id))
                    issues.Add("Null node or empty id.");
                else if (!ids.Add(n.id))
                    issues.Add($"Duplicate node id: {n.id}");
            }

            foreach (var n in nodes)
            {
                if (n == null)
                    continue;
                CheckEdge(n.nextNodeId, n.id, "nextNodeId", ids, issues);

                if (n.choices != null)
                {
                    for (var i = 0; i < n.choices.Length; i++)
                    {
                        var c = n.choices[i];
                        if (c == null)
                        {
                            issues.Add($"Null choice on node '{n.id}' index {i}.");
                            continue;
                        }
                        CheckEdge(c.nextNodeId, n.id, $"choices[{i}].nextNodeId", ids, issues);
                    }
                }
            }

            return new StoryDebugReport(issues);
        }

        static void CheckEdge(string targetId, string fromId, string field, HashSet<string> ids, List<string> issues)
        {
            if (string.IsNullOrEmpty(targetId) || string.Equals(targetId, EndToken, StringComparison.OrdinalIgnoreCase))
                return;
            if (!ids.Contains(targetId))
                issues.Add($"Broken reference: node '{fromId}' {field} -> '{targetId}' (missing).");
        }
    }

    [Serializable]
    public sealed class StoryDebugReport
    {
        public string[] issues;

        public StoryDebugReport(IList<string> list) => issues = list?.ToArray() ?? Array.Empty<string>();

        public bool HasErrors => issues != null && issues.Length > 0;
    }
}
