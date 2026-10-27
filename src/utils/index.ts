export const formatDisplay = (val: string): string => {
  if (!val || val === ".") return val;
  const parts = val.split(".");
  const intPart = parts[0] ? Number(parts[0]).toLocaleString("en-US") : "0";
  return parts.length > 1 ? `${intPart}.${parts[1]}` : intPart;
};

export const parseInput = (val: string): string => {
  let cleaned = val.replace(/,/g, "").replace(/[^\d.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length > 2) cleaned = parts[0] + "." + parts.slice(1).join("");
  return cleaned;
};

export const cleanResult = (num: number): string => {
  if (!isFinite(num)) return "";
  return String(Math.round(num * 10000) / 10000);
};

export const toPersianNumber = (text: string): string => {
  return text.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
};