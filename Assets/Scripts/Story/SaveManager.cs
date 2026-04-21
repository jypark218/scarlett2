using System;
using System.Linq;
using Newtonsoft.Json;
using UnityEngine;

namespace Scarlett.Story
{
    public static class SaveManager
    {
        // ── 단일 자동저장 (StoryRunner.SaveGame 용) ──────────────────────
        const string AutoSaveKey = "scarlett_save";

        [Serializable]
        class AutoSaveData
        {
            public string        storyJsonPath;
            public string        currentNodeId;
            public StoryProgress progress;
        }

        public static bool HasSave =>
            PlayerPrefs.HasKey(AutoSaveKey) || Enumerable.Range(0, SlotCount).Any(i => PlayerPrefs.HasKey(SlotKey(i)));

        public static void Save(string storyJsonPath, StoryNodePlayer player)
        {
            var data = new AutoSaveData
            {
                storyJsonPath = storyJsonPath,
                currentNodeId = player.CurrentNodeId,
                progress      = player.Progress,
            };
            PlayerPrefs.SetString(AutoSaveKey, JsonConvert.SerializeObject(data));
            PlayerPrefs.Save();
        }

        public static bool TryLoad(out string storyJsonPath, out string currentNodeId, out StoryProgress progress)
        {
            storyJsonPath = null; currentNodeId = null; progress = null;
            if (!PlayerPrefs.HasKey(AutoSaveKey)) return false;
            var data = JsonConvert.DeserializeObject<AutoSaveData>(PlayerPrefs.GetString(AutoSaveKey));
            if (data == null) return false;
            storyJsonPath = data.storyJsonPath;
            currentNodeId = data.currentNodeId;
            progress      = data.progress;
            return true;
        }

        public static void DeleteSave() { PlayerPrefs.DeleteKey(AutoSaveKey); PlayerPrefs.Save(); }

        // ── 슬롯 저장 ────────────────────────────────────────────────────
        public const int SlotCount = 3;

        static string SlotKey(int i) => $"scarlett_save_{i}";

        public static void SaveSlot(int slotIndex, string storyJsonPath, StoryNodePlayer player, string title = null)
        {
            var data = new SaveSlotData
            {
                slotIndex     = slotIndex,
                storyJsonPath = storyJsonPath,
                currentNodeId = player.CurrentNodeId,
                progress      = player.Progress,
                title         = title ?? player.Current?.locationId ?? $"슬롯 {slotIndex + 1}",
                saveTime      = DateTime.Now.ToString("yyyy-MM-dd HH:mm"),
            };
            PlayerPrefs.SetString(SlotKey(slotIndex), JsonConvert.SerializeObject(data));
            PlayerPrefs.Save();
        }

        public static SaveSlotData LoadSlot(int slotIndex)
        {
            var key = SlotKey(slotIndex);
            if (!PlayerPrefs.HasKey(key)) return null;
            return JsonConvert.DeserializeObject<SaveSlotData>(PlayerPrefs.GetString(key));
        }

        public static SaveSlotData[] LoadAllSlots()
        {
            var slots = new SaveSlotData[SlotCount];
            for (int i = 0; i < SlotCount; i++)
                slots[i] = LoadSlot(i) ?? new SaveSlotData { slotIndex = i };
            return slots;
        }

        public static void DeleteSlot(int slotIndex)
        {
            PlayerPrefs.DeleteKey(SlotKey(slotIndex));
            PlayerPrefs.Save();
        }
    }
}
