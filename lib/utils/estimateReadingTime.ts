export function estimateReadingTime(htmlContent: string, wordsPerMin = 200) {
  // strip HTML tags quickly
  const text = htmlContent.replace(/<\/?[^>]+(>|$)/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMin));
}
