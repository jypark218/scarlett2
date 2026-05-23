using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using UnityEngine;

namespace Scarlett.Story
{
    public static class StoryCsvParser
    {
        public static List<StoryNode> Parse(string csvText)
        {
            var nodes = new List<StoryNode>();
            
            csvText = csvText.Trim('\uFEFF', '\u200B');
            
            var rawLines = csvText.Split(new[] { "\n", "\r\n" }, StringSplitOptions.None);
            var lines = ReconstructMultilineCsv(rawLines);

            if (lines.Count <= 1) return nodes;

            string[] headers = ParseCsvLine(lines[0]);
            var colMap = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
            for (int i = 0; i < headers.Length; i++)
            {
                string h = headers[i].Trim().Trim('"');
                if (!string.IsNullOrEmpty(h)) colMap[h] = i;
            }

            for (int i = 1; i < lines.Count; i++)
            {
                string[] values = ParseCsvLine(lines[i]);
                string id = GetValue(values, colMap, "ID");
                if (string.IsNullOrEmpty(id)) continue;

                var node = new StoryNode
                {
                    id = id,
                    speakerId = GetValue(values, colMap, "Speaker"),
                    expressionKey = GetValue(values, colMap, "Expression"),
                    text = GetValue(values, colMap, "Text"),
                    backgroundId = GetValue(values, colMap, "Background"),
                    locationId = GetValue(values, colMap, "Location")
                };

                // NextID 및 Choice 처리
                string nextIdRaw = GetValue(values, colMap, "NextID");
                if (nextIdRaw.StartsWith("CHOICE:", StringComparison.OrdinalIgnoreCase))
                {
                    string choiceData = nextIdRaw.Substring(7); // "CHOICE:" 제거
                    var choiceParts = choiceData.Split(new[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                    var choiceList = new List<Choice>();

                    foreach (var part in choiceParts)
                    {
                        var split = part.Split('|');
                        if (split.Length >= 2)
                        {
                            choiceList.Add(new Choice
                            {
                                text = split[0],
                                nextNodeId = split[1]
                            });
                        }
                        else if (split.Length == 1)
                        {
                            // 텍스트가 없는 경우 ID를 텍스트로 사용
                            choiceList.Add(new Choice
                            {
                                text = split[0],
                                nextNodeId = split[0]
                            });
                        }
                    }
                    node.choices = choiceList.ToArray();
                    node.nextNodeId = null;
                }
                else
                {
                    node.nextNodeId = nextIdRaw;
                    node.choices = null;
                }

                // 아이템 처리
                string item = GetValue(values, colMap, "Item");
                if (!string.IsNullOrEmpty(item) && !node.text.Contains($"[item:{item}]"))
                {
                    node.text = $"[item:{item}] " + node.text;
                }

                // 효과 처리
                string effect = GetValue(values, colMap, "Effect");
                if (effect.ToLower().Contains("shake")) node.shake = true;

                nodes.Add(node);
            }

            return nodes;
        }

        static string GetValue(string[] values, Dictionary<string, int> colMap, string key)
        {
            if (colMap.TryGetValue(key, out int index) && index < values.Length)
            {
                return values[index].Trim().Trim('"').Replace("\"\"", "\"");
            }
            return string.Empty;
        }

        static string[] ParseCsvLine(string line)
        {
            return Regex.Split(line, ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
        }

        static List<string> ReconstructMultilineCsv(string[] rawLines)
        {
            var result = new List<string>();
            string currentLine = "";
            bool inQuotes = false;

            foreach (var line in rawLines)
            {
                if (currentLine == "") currentLine = line;
                else currentLine += "\n" + line;

                int quoteCount = 0;
                foreach (char c in line) if (c == '"') quoteCount++;
                
                if (quoteCount % 2 != 0) inQuotes = !inQuotes;

                if (!inQuotes)
                {
                    result.Add(currentLine);
                    currentLine = "";
                }
            }
            return result;
        }
    }
}
