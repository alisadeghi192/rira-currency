import { CURRENCY_NAMES, CURRENCY_UNITS } from "../constants";
import type { Rates } from "../types";

interface Props {
  fromValue: string;
  toValue: string;
  fromCurrency: keyof Rates;
  toCurrency: keyof Rates;
}

export function ConversionSummary({ fromValue, toValue, fromCurrency, toCurrency }: Props) {
  const getLabel = (key: keyof Rates) => `${CURRENCY_UNITS[key] || ""}${CURRENCY_NAMES[key]}`;

  if (!fromValue || !toValue) return null;

  return (
    <div className="mt-5 p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-center">
      <p className="text-sm text-indigo-700 font-medium">
        {Number(fromValue).toLocaleString("fa-IR")} {getLabel(fromCurrency)}
        <span className="mx-2 text-slate-400">=</span>
        {Number(toValue).toLocaleString("fa-IR")} {getLabel(toCurrency)}
      </p>
    </div>
  );
}