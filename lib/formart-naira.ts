export function formatNaira(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "₦0";
  return `₦${num.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;
}
