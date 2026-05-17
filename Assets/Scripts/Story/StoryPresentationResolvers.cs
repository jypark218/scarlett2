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

    /// <summary>음악 우선순위: Node(High) > Character > Node(Normal) > Background.</summary>
    public sealed class MusicResolver
    {
        readonly StoryAuthoringDatabase db;

        public MusicResolver(StoryAuthoringDatabase database) => db = database;

        public string Resolve(StoryNode node, string currentBackgroundKey)
        {
            if (db == null || node == null)
                return null;

            // 1. Node (High Priority)
            if (db.musicPerNode != null)
            {
                var nodeRule = db.musicPerNode.FirstOrDefault(r =>
                    r != null && string.Equals(r.nodeId, node.id, StringComparison.Ordinal));
                if (nodeRule != null && nodeRule.priority == MusicPriority.High)
                    return nodeRule.trackId;
            }

            // 2. Character Theme
            if (db.musicPerCharacter != null && !string.IsNullOrEmpty(node.speakerId))
            {
                var charRule = db.musicPerCharacter.FirstOrDefault(r =>
                    r != null && string.Equals(r.characterId, node.speakerId, StringComparison.Ordinal));
                if (charRule != null)
                    return charRule.trackId;
            }

            // 3. Node (Normal Priority)
            if (db.musicPerNode != null)
            {
                var nodeRule = db.musicPerNode.FirstOrDefault(r =>
                    r != null && string.Equals(r.nodeId, node.id, StringComparison.Ordinal));
                if (nodeRule != null && nodeRule.priority == MusicPriority.Normal)
                    return nodeRule.trackId;
            }

            // 4. Background Default
            if (db.musicPerBackground != null && !string.IsNullOrEmpty(currentBackgroundKey))
            {
                var bgRule = db.musicPerBackground.FirstOrDefault(r =>
                    r != null && string.Equals(r.backgroundKey, currentBackgroundKey, StringComparison.Ordinal));
                if (bgRule != null)
                    return bgRule.trackId;
            }

            return null;
        }

        public MusicTrackDefinition GetTrackDefinition(string trackId)
        {
            if (db == null || db.musicTracks == null || string.IsNullOrEmpty(trackId))
                return null;
            return db.musicTracks.FirstOrDefault(t =>
                t != null && string.Equals(t.trackId, trackId, StringComparison.Ordinal));
        }
    }
}
