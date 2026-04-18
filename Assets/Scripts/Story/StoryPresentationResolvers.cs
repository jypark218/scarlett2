using System;
using System.Linq;

namespace Scarlett.Story
{
    /// <summary>2단계: speakerId → 비주얼 바인딩.</summary>
    public sealed class CharacterPortraitResolver
    {
        readonly StoryAuthoringDatabase db;

        public CharacterPortraitResolver(StoryAuthoringDatabase database) => db = database;

        public CharacterVisualBinding Resolve(string speakerId)
        {
            if (db == null || db.characters == null || string.IsNullOrEmpty(speakerId))
                return null;
            return db.characters.FirstOrDefault(c =>
                c != null && string.Equals(c.speakerId, speakerId, StringComparison.Ordinal));
        }
    }

    /// <summary>3단계: locationId + node.id → 배경 키.</summary>
    public sealed class BackgroundResolver
    {
        readonly StoryAuthoringDatabase db;

        public BackgroundResolver(StoryAuthoringDatabase database) => db = database;

        public string Resolve(StoryNode node)
        {
            if (node == null || db?.locations == null)
                return null;

            var rule = db.locations.FirstOrDefault(l =>
                l != null && string.Equals(l.locationId, node.locationId, StringComparison.Ordinal));
            if (rule == null)
                return null;

            if (rule.perNode != null && !string.IsNullOrEmpty(node.id))
            {
                var hit = rule.perNode.FirstOrDefault(o =>
                    o != null && string.Equals(o.nodeId, node.id, StringComparison.Ordinal));
                if (hit != null && !string.IsNullOrEmpty(hit.backgroundKey))
                    return hit.backgroundKey;
            }

            return rule.defaultBackgroundKey;
        }
    }
}
