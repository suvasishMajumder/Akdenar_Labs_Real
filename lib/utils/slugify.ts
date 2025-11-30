export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "") // Removes all non-word, non-hyphen characters
    .replace(/--+/g, "-");
}
