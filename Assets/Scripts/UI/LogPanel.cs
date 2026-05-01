using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace Scarlett.UI
{
    public struct LogEntry
    {
        public string Speaker;
        public string Text;
        public UnityEngine.Color SpeakerColor;
    }

    public class LogPanel : UIPanel
    {
        [SerializeField] Transform      contentParent;
        [SerializeField] LogEntryItem   entryItemPrefab;
        [SerializeField] ScrollRect     scrollRect;

        public void Setup(IReadOnlyList<LogEntry> history)
        {
            if (entryItemPrefab == null) { Debug.LogError("[LogPanel] entryItemPrefab 없음"); return; }

            var toDestroy = new List<GameObject>();
            foreach (Transform child in contentParent)
            {
                if (child == entryItemPrefab.transform) continue;
                toDestroy.Add(child.gameObject);
            }
            foreach (var go in toDestroy)
                Destroy(go);

            foreach (var entry in history)
            {
                var item = Instantiate(entryItemPrefab, contentParent);
                item.gameObject.SetActive(true);
                item.Setup(entry.Speaker, entry.Text, entry.SpeakerColor);
            }

            StartCoroutine(ScrollToBottom());
        }

        IEnumerator ScrollToBottom()
        {
            yield return new WaitForEndOfFrame();
            LayoutRebuilder.ForceRebuildLayoutImmediate((RectTransform)contentParent);
            yield return new WaitForEndOfFrame();
            if (scrollRect != null)
                scrollRect.verticalNormalizedPosition = 0f;
        }
    }
}
