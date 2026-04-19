using Newtonsoft.Json;
using UnityEngine;

namespace Scarlett.Story
{
    public static class SaveManager
    {
        const string SaveKey = "scarlett_save";

        [System.Serializable]
        class SaveData
        {
            public string storyJsonPath;
            public string currentNodeId;
            public StoryProgress progress;
        }

        public static bool HasSave => PlayerPrefs.HasKey(SaveKey);

        public static void Save(string storyJsonPath, StoryNodePlayer player)
        {
            var data = new SaveData
            {
                storyJsonPath = storyJsonPath,
                currentNodeId = player.CurrentNodeId,
                progress      = player.Progress
            };
            PlayerPrefs.SetString(SaveKey, JsonConvert.SerializeObject(data));
            PlayerPrefs.Save();
            Debug.Log("[SaveManager] 저장 완료");
        }

        public static bool TryLoad(out string storyJsonPath, out string currentNodeId, out StoryProgress progress)
        {
            storyJsonPath = null;
            currentNodeId = null;
            progress      = null;

            if (!PlayerPrefs.HasKey(SaveKey)) return false;

            var data = JsonConvert.DeserializeObject<SaveData>(PlayerPrefs.GetString(SaveKey));
            if (data == null) return false;

            storyJsonPath = data.storyJsonPath;
            currentNodeId = data.currentNodeId;
            progress      = data.progress;
            return true;
        }

        public static void DeleteSave()
        {
            PlayerPrefs.DeleteKey(SaveKey);
            PlayerPrefs.Save();
        }
    }
}
