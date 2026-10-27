import { formatDisplay } from "../utils";
import CustomSelect from "./CustomSelect";
import type { Rates } from "../types";

interface CurrencyInputProps {
  label: string;
  value: string;
  currency: keyof Rates;
  currencies: (keyof Rates)[];
  onChangeValue: (v: string) => void;
  onChangeCurrency: (c: keyof Rates) => void;
  textColor?: string;
}

export function CurrencyInput({
  label,
  value,
  currency,
  currencies,
  onChangeValue,
  onChangeCurrency,
  textColor = "text-slate-800",
}: CurrencyInputProps) {
  return (
    <div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4 border flex flex-col gap-2 border-slate-200 dark:border-slate-700 focus-within:border-indigo-400 dark:focus-within:border-indigo-600 transition-colors">
      <div className="flex items-center gap-2">
        <span className="text-slate-600 dark:text-slate-400">{label}</span>
        <CustomSelect
          currencies={currencies}
          onChange={onChangeCurrency}
          value={currency}
        />
      </div>
      <input
        value={formatDisplay(value)}
        onChange={(e) => onChangeValue(e.target.value)}
        type="text"
        inputMode="decimal"
        placeholder="0"
        className={`w-full overflow-hidden leading-none bg-transparent text-3xl font-bold outline-none text-left ${textColor}` }
        dir="ltr"
      />
    </div>
  );
}