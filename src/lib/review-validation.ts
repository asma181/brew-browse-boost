export function sanitizeReview(text: string): string {
  const result = text || "";
  const lines = result.split("\n");
  const sanitizedLines = lines.map((line) => {
    let l = line;
    l = l.replace(/\|{2,}/g, "");
    l = l.replace(/\s+/g, " ");
    l = l.replace(/([^\p{L}\s])\1{3,}/gu, "$1");
    return l.trim();
  });
  return sanitizedLines.join("\n").trim();
}

export function isValidReview(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length === 0) return false;

  const words = trimmed.split(/\s+/);
  for (const word of words) {
    if (word.length > 50) return false;
  }

  const letterCount = (trimmed.match(/\p{L}/gu) || []).length;
  if (letterCount < 3) return false;

  if (trimmed.length > 500) return false;

  return true;
}

export function sanitizeName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}
