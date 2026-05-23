using System.Collections.Generic;
using System.Text.RegularExpressions;
using Scarlett.UI;
using UnityEngine;

namespace Scarlett.Story
{
    public class StoryRunner : MonoBehaviour
    {
        [SerializeField] string storyJsonPath  = "Story/ScarlettStoryData";
        [SerializeField] string startNodeId    = "start";
        [SerializeField] StoryAuthoringDatabase authoringDatabase;

        StoryNodePlayer _player;

        public void StartNewGame()
        {
            LoadGraph();
            if (_player == null) { Debug.LogError("[StoryRunner] LoadGraph 실패 - _player null"); return; }
            
            // 기존 캐릭터 포트레이트 초기화
            GameUI.Instance.Dialogue.ClearCharacterSlots();

            var entered = _player.TryEnter(startNodeId);
            ShowCurrentNode();
        }

        public void ContinueGame()
        {
            if (!SaveManager.TryLoad(out var path, out var nodeId, out var progress))
            {
                Debug.LogWarning("[StoryRunner] 저장 데이터 없음");
                return;
            }
            LoadGraph(path, progress);

            // 기존 캐릭터 포트레이트 초기화
            GameUI.Instance.Dialogue.ClearCharacterSlots();

            _player.TryEnter(nodeId);
            ShowCurrentNode();
        }

        public void SaveGame()
        {
            if (_player == null) return;
            SaveManager.Save(storyJsonPath, _player);
        }

        public void SaveToSlot(int slotIndex)
        {
            if (_player == null) return;
            SaveManager.SaveSlot(slotIndex, storyJsonPath, _player);
        }

        public void ContinueFromSlot(SaveSlotData data)
        {
            if (data == null || data.IsEmpty) return;
            LoadGraph(data.storyJsonPath, data.progress);
            _player.TryEnter(data.currentNodeId);
            ShowCurrentNode();
        }

        public static bool HasSave => SaveManager.HasSave;

        void LoadGraph(string path = null, StoryProgress existingProgress = null)
        {
            var loadPath = path ?? storyJsonPath;

            StoryNode[] nodes = null;

            var csvTa = Resources.Load<TextAsset>(loadPath); 
            if (csvTa != null && csvTa.text.Contains("ID,Type,Speaker"))
            {
                nodes = StoryCsvParser.Parse(csvTa.text).ToArray();
            }
            
            if (nodes == null || nodes.Length == 0)
            {
                var ta = Resources.Load<TextAsset>(loadPath);
                if (ta == null) { Debug.LogError($"[StoryRunner] 데이터 없음: {loadPath}"); return; }
                var list = StoryGraphJsonUtility.ListFromJson(ta.text);
                nodes = list?.nodes;
            }

            if (nodes == null || nodes.Length == 0) { Debug.LogError("[StoryRunner] 노드 로드 실패"); return; }

            _player = new StoryNodePlayer(authoring: authoringDatabase, existingProgress: existingProgress);
            _player.SetGraph(nodes);
        }

        void ShowCurrentNode()
        {
            var cur = _player?.Current;
            if (cur == null) { ShowEnding(null); return; }

            if (cur.isEnding)
            {
                ShowNodeText(cur);
                return;
            }

            var choices   = _player.GetAvailableChoices();
            bool hasText  = !string.IsNullOrWhiteSpace(cur.text);
            bool hasChoices = choices.Count > 0;

            if (hasText && hasChoices)
            {
                ShowNodeText(cur, onNext: () => ShowChoices(choices));
            }
            else if (hasChoices)
            {
                ShowChoices(choices);
            }
            else
            {
                ShowNodeText(cur, onNext: OnNextClicked);
            }
        }

        string _lastSelectedChoiceLabel = null;

        void ShowChoices(IReadOnlyList<Choice> choices)
        {
            var labels = new string[choices.Count];
            for (int i = 0; i < choices.Count; i++)
            {
                labels[i] = GetChoiceLabel(choices[i]) ?? $"선택지 {i + 1}";
            }
            GameUI.Instance.Dialogue.SetChoices(labels, OnChoiceSelected);
        }

        string GetChoiceLabel(Choice c)
        {
            if (c == null) return null;
            string txt = c.text;

            // 텍스트가 비어있거나 ID와 동일한 경우(기획상 누락 혹은 기술적 키 노출), 타겟 노드의 텍스트를 지문으로 사용
            if (string.IsNullOrEmpty(txt) || txt == c.nextNodeId)
            {
                var targetNode = _player.GetNode(c.nextNodeId);
                if (targetNode != null && !string.IsNullOrEmpty(targetNode.text))
                {
                    txt = targetNode.text;
                }
            }

            if (!string.IsNullOrEmpty(txt))
            {
                // 선택지 지문에서 [item:...] 혹은 기타 [태그] 형식의 아이콘/명령어 제거
                txt = _itemTagRegex.Replace(txt, "");
                txt = Regex.Replace(txt, @"\[.*?\]", ""); // 모든 대괄호 태그 제거 (이름 태그 등 포함)
                txt = txt.Trim();
            }

            return txt;
        }

        Queue<string> _textChunks = new Queue<string>();
        StoryNode _chunkNode;
        System.Action _chunkOnNext;

        void ShowNodeText(StoryNode node, System.Action onNext = null)
        {
            _chunkNode = node;
            _chunkOnNext = onNext ?? (() => ShowEnding(node));

            string rawText = node.text ?? "";
            var chunks = rawText.Split(new string[] { "\n\n", "\r\n\r\n" }, System.StringSplitOptions.RemoveEmptyEntries);
            
            _textChunks.Clear();
            bool isFirstChunk = true;
            foreach (var c in chunks)
            {
                var trimmed = c.Trim();
                if (string.IsNullOrEmpty(trimmed)) continue;

                // 중복 체크: 방금 누른 선택지 문구와 첫 번째 대사 내용이 같다면 스킵 (대사 중첩 방지)
                if (isFirstChunk && !string.IsNullOrEmpty(_lastSelectedChoiceLabel))
                {
                    if (IsRedundant(trimmed, _lastSelectedChoiceLabel))
                    {
                        isFirstChunk = false;
                        continue;
                    }
                }

                _textChunks.Enqueue(trimmed);
                isFirstChunk = false;
            }

            _lastSelectedChoiceLabel = null; // 초기화
            ShowNextChunk();
        }

        bool IsRedundant(string nodeText, string choiceLabel)
        {
            // 이름 태그, 따옴표, 공백, 주요 문장 부호를 제거하고 실질적인 대사 내용만 비교
            string s1 = CleanForCompare(StripNameTags(nodeText));
            string s2 = CleanForCompare(StripNameTags(choiceLabel));
            return !string.IsNullOrEmpty(s1) && s1 == s2;
        }

        string CleanForCompare(string text)
        {
            if (string.IsNullOrEmpty(text)) return string.Empty;
            return text.Replace(" ", "")
                       .Replace("\"", "")
                       .Replace("'", "")
                       .Replace("\n", "")
                       .Replace("\r", "")
                       .Replace(".", "")
                       .Replace(",", "")
                       .Replace("!", "")
                       .Replace("?", "")
                       .Replace("~", "");
        }

        static readonly Regex _itemTagRegex = new Regex(@"\[\s*item\s*:(.*?)\]", RegexOptions.IgnoreCase);
        static readonly Regex _titleTagRegex = new Regex(@"\[\s*title\s*:(.*?)\]", RegexOptions.IgnoreCase);

        void ShowNextChunk()
        {
            if (_textChunks.Count == 0)
            {
                var next = _chunkOnNext;
                _chunkOnNext = null;
                next?.Invoke();
                return;
            }

            GameUI.Instance.Dialogue.SetItemImage(null);
            string chunk = _textChunks.Dequeue();

            // 1. 챕터 타이틀 태그 처리
            var titleMatch = _titleTagRegex.Match(chunk);
            if (titleMatch.Success)
            {
                string titleText = titleMatch.Groups[1].Value;
                string remainingText = chunk.Replace(titleMatch.Value, "").Trim();

                GameUI.Instance.ShowPopup(titleText, "시작", null, () => 
                {
                    if (string.IsNullOrEmpty(remainingText)) ShowNextChunk();
                    else ProcessChunk(remainingText);
                });
                return;
            }

            ProcessChunk(chunk);
        }

        void ProcessChunk(string chunk)
        {
            var itemMatch = _itemTagRegex.Match(chunk);
            if (itemMatch.Success)
            {
                string spriteName = itemMatch.Groups[1].Value;
                var itemSprite = Resources.Load<Sprite>($"ArtResources/UISprites/Story/{spriteName}");
                GameUI.Instance.Dialogue.SetItemImage(itemSprite);
                chunk = _itemTagRegex.Replace(chunk, "");
            }

            bool hasNameTag = _nameTagRegex.IsMatch(chunk);
            string speakerId = null;
            string displayName = null;
            Color color = Color.white;
            Sprite portraitSprite = null;

            if (hasNameTag)
            {
                var match = _nameTagRegex.Match(chunk);
                string extractedName = match.Value.Trim().TrimStart('[').TrimEnd(':', ']', ' ');
                displayName = extractedName;

                CharacterVisualBinding binding = null;
                if (authoringDatabase != null && authoringDatabase.characters != null)
                {
                    binding = System.Array.Find(authoringDatabase.characters, 
                        c => c != null && (c.displayName == extractedName || c.speakerId == extractedName));
                }

                if (binding == null && !string.IsNullOrEmpty(_chunkNode.speakerId))
                {
                    binding = _player.ResolveSpeaker();
                }

                if (binding != null)
                {
                    speakerId = binding.speakerId;
                    color = binding.nameColor;
                    portraitSprite = binding.GetSprite(_chunkNode.expressionKey ?? "default");
                }
                else speakerId = "dialogue";
            }

            var text = StripNameTags(chunk);
            GameUI.Instance.Dialogue.SetDialogue(speakerId, displayName, text, color, portraitSprite, onNext: ShowNextChunk);
        }

        static readonly Regex _nameTagRegex     = new Regex(@"^\[.*?\]:\s*", RegexOptions.Multiline);
        static readonly Regex _multiNewlineRegex = new Regex(@"\n{2,}");

        static string StripNameTags(string text)
        {
            text = _nameTagRegex.Replace(text, string.Empty);
            text = _multiNewlineRegex.Replace(text, "\n");
            return text.Trim();
        }

        void OnNextClicked()
        {
            var cur = _player?.Current;
            if (cur == null) { ShowEnding(null); return; }

            if (!string.IsNullOrEmpty(cur.nextNodeId) && cur.nextNodeId.StartsWith("LOAD:"))
            {
                string nextFile = cur.nextNodeId.Substring(5).Trim();
                storyJsonPath = $"Story/{nextFile}";
                LoadGraph(storyJsonPath);
                
                var firstNodeId = _player.GetFirstNodeId();
                if (!string.IsNullOrEmpty(firstNodeId))
                {
                    _player.TryEnter(firstNodeId);
                    ShowCurrentNode();
                }
                else ShowEnding(null);
                return;
            }

            if (!string.IsNullOrEmpty(cur.nextNodeId))
            {
                if (!_player.TryEnter(cur.nextNodeId))
                {
                    Debug.LogError($"[StoryRunner] 다음 노드 진입 실패: {cur.nextNodeId}");
                    ShowEnding(cur);
                    return;
                }
                ShowCurrentNode();
            }
            else ShowEnding(cur);
        }

        void OnChoiceSelected(int index)
        {
            var choices = _player.GetAvailableChoices();
            if (index >= 0 && index < choices.Count)
            {
                _lastSelectedChoiceLabel = GetChoiceLabel(choices[index]);
            }

            var before = _player.Current?.id;
            _player.TrySelectAvailableChoice(index);
            var after = _player.Current?.id;

            if (after == null || after == before) ShowEnding(null);
            else
            {
                SaveGame();
                ShowCurrentNode();
            }
        }

        void ShowEnding(StoryNode endingNode)
        {
            GameUI.Instance.Dialogue.Hide();
            GameUI.Instance.Intro.Setup(
                onStart:    StartNewGame,
                onContinue: HasSave ? (System.Action)ContinueGame : null
            );
        }
    }
}
