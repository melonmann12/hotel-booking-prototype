export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

/**
 * Strips Vietnamese diacritics / accents from a string for fuzzy matching.
 * "Đà Lạt" → "da lat", "Hồ Chí Minh" → "ho chi minh"
 */
export function normalizeVietnamese(str: string): string {
  return str
    .normalize("NFD")                       // decompose accented chars
    .replace(/[\u0300-\u036f]/g, "")        // strip combining diacritical marks
    .replace(/[Đđ]/g, "d")                  // Đ doesn't decompose via NFD
    .toLowerCase()
    .trim();
}
