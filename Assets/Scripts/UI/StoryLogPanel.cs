using System.Collections.Generic;
using Scarlett.Story;
using UnityEngine;

namespace Scarlett.UI
{
    public class StoryLogPanel : UIPanel
    {
        [SerializeField] Transform          content;
        [SerializeField] StoryLogEntryItem  entryTemplate;

        void Awake()
        {
            entryTemplate?.gameObject.SetActive(false);
        }

        public void Open(IReadOnlyList<StoryLogEntry> entries)
        {
            Show();
            Refresh(entries);
        }

        void Refresh(IReadOnlyList<StoryLogEntry> entries)
        {
            foreach (Transform child in content)
                if (child.gameObject != entryTemplate?.gameObject) Destroy(child.gameObject);

            if (entryTemplate == null) { Debug.LogError("[StoryLogPanel] entryTemplate 없음"); return; }

            foreach (var entry in entries)
            {
                var item = Instantiate(entryTemplate, content);
                item.gameObject.SetActive(true);
                item.Setup(entry);
            }
        }
    }
}
