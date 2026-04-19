// 422번 줄만 수정:
// 기존: const parts = normalizedText.split(/(\\\"[^\\\"]*\\\")/g);
// 수정: const parts = normalizedText.split(/("[^"]*")/g);
