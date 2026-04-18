using System;
using UnityEngine;

namespace Scarlett.Story
{
    /// <summary>Unity JsonUtility 기준 직렬화/역직렬화 (외부 JSON 키 이름과 필드명이 일치해야 함).</summary>
    public static class StoryGraphJsonUtility
    {
        public static string ToJson(StoryNode node) => JsonUtility.ToJson(node, true);

        public static string ToJson(StoryNodeList list) => JsonUtility.ToJson(list, true);

        public static string ToJson(StoryProgress progress) => JsonUtility.ToJson(progress, true);

        public static StoryNode NodeFromJson(string json)
        {
            if (string.IsNullOrWhiteSpace(json))
                throw new ArgumentException("JSON is empty.", nameof(json));
            return JsonUtility.FromJson<StoryNode>(json);
        }

        public static StoryNodeList ListFromJson(string json)
        {
            if (string.IsNullOrWhiteSpace(json))
                throw new ArgumentException("JSON is empty.", nameof(json));
            return JsonUtility.FromJson<StoryNodeList>(json);
        }

        public static StoryProgress ProgressFromJson(string json)
        {
            if (string.IsNullOrWhiteSpace(json))
                throw new ArgumentException("JSON is empty.", nameof(json));
            return JsonUtility.FromJson<StoryProgress>(json);
        }
    }
}
