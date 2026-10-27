import { CURRENCY_NAMES, CURRENCY_UNITS } from "../constants";
import type { Rates } from "../types";
import { formatDisplay } from "../utils";
import CustomSelect from "./CustomSelect";
interface ConverterProps {
  rates: Rates;
  fromCurrency: keyof Rates;
  toCurrency: keyof Rates;
  fromValue: string;
  toValue: string;
  handleFromChange: (v: string) => void;
  handleToChange: (v: string) => void;
  handleFromCurrencyChange: (c: keyof Rates) => void;
  handleToCurrencyChange: (c: keyof Rates) => void;
  handleSwap: () => void;
}

export function Converter({
  rates,
  fromCurrency,
  toCurrency,
  fromValue,
  toValue,
  handleFromChange,
  handleToChange,
  handleFromCurrencyChange,
  handleToCurrencyChange,
  handleSwap,
}: ConverterProps) {
  const rateKeys = Object.keys(rates) as (keyof Rates)[];
  const fromCurrencies = rateKeys.filter((key) => key !== toCurrency);
  const toCurrencies = rateKeys.filter((key) => key !== fromCurrency);

  const getCurrencyLabel = (key: keyof Rates) => {
    const unit = CURRENCY_UNITS[key] || "";
    return `${unit}${CURRENCY_NAMES[key]}`;
  };

  return (
    <div className="bg-white  p-5 rounded-2xl shadow-sm border border-slate-200">
      <div className="bg-slate-100 rounded-xl p-4 border flex flex-col gap-2 border-slate-200 focus-within:border-indigo-400 transition-colors">
        <div className="flex items-center gap-2">
          <span className=" text-slate-600">از</span>

          <CustomSelect
            currencies={fromCurrencies}
            onChange={handleFromCurrencyChange}
            value={fromCurrency}
          />
        </div>
        <input
          value={formatDisplay(fromValue)}
          onChange={(e) => handleFromChange(e.target.value)}
          type="text"
          inputMode="decimal"
          placeholder="0"
          className="w-full overflow-hidden leading-none bg-transparent text-3xl font-bold text-slate-800 outline-none text-left"
          dir="ltr"
        />
      </div>

      <div className="flex justify-center -my-3.5">
        <button
          onClick={handleSwap}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-full shadow-lg border border-indigo-200  transition-transform hover:scale-110 cursor-pointer"
        >
          <img src="/icons/arrows-up-down.svg" alt="⇅" className="size-5" />
        </button>
      </div>

      <div className="bg-slate-100 rounded-xl p-4 border flex flex-col gap-2 border-slate-200 focus-within:border-indigo-400 transition-colors">
        <div className="flex items-center gap-2">
          <span className=" text-slate-600">به</span>
          <CustomSelect
            currencies={toCurrencies}
            onChange={handleToCurrencyChange}
            value={toCurrency}
          />
        </div>
        <input
          value={formatDisplay(toValue)}
          onChange={(e) => handleToChange(e.target.value)}
          type="text"
          inputMode="decimal"
          placeholder="0"
          className="w-full overflow-hidden leading-none bg-transparent text-emerald-600 text-3xl font-bold outline-none text-left"
          dir="ltr"
        />
      </div>
      {fromValue && toValue && (
        <div className="mt-5 p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-center">
          <p className="text-sm text-indigo-700 font-medium">
            {Number(fromValue).toLocaleString("fa-IR")}{" "}
            {getCurrencyLabel(fromCurrency)}
            <span className="mx-2 text-slate-400">=</span>
            {Number(toValue).toLocaleString("fa-IR")}{" "}
            {getCurrencyLabel(toCurrency)}
          </p>
        </div>
      )}
    </div>
  );
}
