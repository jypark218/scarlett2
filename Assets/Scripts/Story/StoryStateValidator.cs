using System;
using System.Collections.Generic;
using System.Linq;

namespace Scarlett.Story
{
    public static class StoryStateValidator
    {
        /// <summary>6단계: 상호 배타 플래그 그룹 위반 여부.</summary>
        public static bool ValidateExclusiveFlags(StoryProgress progress, ExclusiveFlagGroup[] groups, out string message)
        {
            message = null;
            if (progress?.flags == null || groups == null)
                return true;

            var active = new HashSet<string>(StringComparer.Ordinal);
            foreach (var f in progress.flags)
            {
                if (f != null && f.isActive && !string.IsNullOrEmpty(f.key))
                    active.Add(f.key);
            }

            foreach (var g in groups)
            {
                if (g?.flagKeys == null || g.flagKeys.Length == 0)
                    continue;
                var count = g.flagKeys.Count(k => !string.IsNullOrEmpty(k) && active.Contains(k));
                if (count > 1)
                {
                    message = $"Exclusive group '{g.groupId}' has more than one active flag.";
                    return false;
                }
            }

            return true;
        }
    }
}
