using System;
using Naninovel;
using Naninovel.Commands;
using Naninovel.Metadata;
using Scarlett.Story;
using UnityEngine;

namespace Scarlett.NaninovelIntegration
{
    [Serializable, Alias("storyLoad"), Doc("Resources 경로(확장자 제외)의 StoryNodeList JSON을 로드하고 첫 노드로 진입합니다.")]
    public class StoryLoadGraph : Command
    {
        [Alias(NamelessParameterAlias), RequiredParameter]
        public StringParameter ResourcePath;

        public override Awaitable Execute(ExecutionContext ctx)
        {
            var path = ResourcePath.Value;
            if (string.IsNullOrWhiteSpace(path))
                throw new Error($"{nameof(StoryLoadGraph)}: empty resource path.");
            var ta = Resources.Load<TextAsset>(path);
            if (!ta)
                throw new Error($"{nameof(StoryLoadGraph)}: missing Resources asset '{path}'.");
            var list = StoryGraphJsonUtility.ListFromJson(ta.text);
            if (list?.nodes == null || list.nodes.Length == 0)
                throw new Error($"{nameof(StoryLoadGraph)}: no nodes in JSON.");
            var player = new StoryNodePlayer();
            StoryNaninovelSession.Player = player;
            player.SetGraph(list.nodes);
            if (!player.TryEnter(list.nodes[0].id))
                throw new Error($"{nameof(StoryLoadGraph)}: failed to enter first node '{list.nodes[0].id}'.");
            return default;
        }
    }

    [Serializable, Alias("storyStep"), Doc("현재 StoryNode 텍스트를 기본 프린터로 출력한 뒤, nextNodeId가 있으면 한 칸 진행합니다.")]
    public class StoryRevealStep : Command
    {
        public override async Awaitable Execute(ExecutionContext ctx)
        {
            var player = StoryNaninovelSession.Player;
            var cur = player?.Current;
            if (cur == null)
                return;
            var printers = Engine.GetServiceOrErr<ITextPrinterManager>();
            var text = string.IsNullOrEmpty(cur.text) ? " " : cur.text;
            var msg = string.IsNullOrEmpty(cur.speakerId)
                ? new PrintedMessage(text)
                : new PrintedMessage(text, new MessageAuthor(cur.speakerId));
            await printers.Print(printers.DefaultPrinterId, msg, token: ctx.Token);
            if (!string.IsNullOrEmpty(cur.nextNodeId))
                player.TryEnter(cur.nextNodeId);
        }
    }

}
