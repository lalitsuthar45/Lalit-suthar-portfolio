/** `2,400` — locale-stable so server and client renders match. */
export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

export const currentYear = () => new Date().getFullYear();
