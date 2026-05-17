namespace Scarlett.Story
{
    public struct StoryLogEntry
    {
        public string Speaker;
        public string Text;

        public bool IsNarration => string.IsNullOrEmpty(Speaker);
    }
}
