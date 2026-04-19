using System;
using Newtonsoft.Json;
using UnityEngine;

namespace Scarlett.Story
{
    public static class StoryGraphJsonUtility
    {
        static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            NullValueHandling    = NullValueHandling.Ignore,
            DefaultValueHandling = DefaultValueHandling.Ignore,
        };

        public static string ToJson(StoryNode node)     => JsonConvert.SerializeObject(node,     Formatting.Indented, Settings);
        public static string ToJson(StoryNodeList list)  => JsonConvert.SerializeObject(list,     Formatting.Indented, Settings);
        public static string ToJson(StoryProgress prog)  => JsonConvert.SerializeObject(prog,     Formatting.Indented, Settings);

        public static StoryNode     NodeFromJson(string json)     => JsonConvert.DeserializeObject<StoryNode>(json);
        public static StoryNodeList ListFromJson(string json)     => JsonConvert.DeserializeObject<StoryNodeList>(json);
        public static StoryProgress ProgressFromJson(string json) => JsonConvert.DeserializeObject<StoryProgress>(json);
    }
}
