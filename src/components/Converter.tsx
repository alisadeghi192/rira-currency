import { CURRENCY_NAMES } from "../constants";
import type { Rates } from "../types";
import { cleanResult, formatDisplay, parseInput } from "../utils";
import CustomSelect from "./CustomSelect";
interface ConverterProps {
  rates: Rates;
  fromCurrency: keyof Rates;
  setFromCurrency: (c: keyof Rates) => void;
  toCurrency: keyof Rates;
  setToCurrency: (c: keyof Rates) => void;
  fromValue: string;
  setFromValue: (v: string) => void;
  toValue: string;
  setToValue: (v: string) => void;
}

export function Converter({
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
  fromValue,
  setFromValue,
  toValue,
  setToValue,
  rates,
}: ConverterProps) {
  const rateKeys = Object.keys(rates) as (keyof Rates)[];

  const fromCurrencies = rateKeys.filter((key) => key !== toCurrency);
  const toCurrencies = rateKeys.filter((key) => key !== fromCurrency);

  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];

  const rate = fromRate / toRate;

  const handleFromChange = (val: string) => {
    const parsed = parseInput(val);
    setFromValue(parsed);
    if (!parsed || parsed === ".") {
      setToValue("");
      return;
    }
    setToValue(cleanResult(Number(parsed) * rate));
  };

  const handleToChange = (val: string) => {
    const parsed = parseInput(val);
    setToValue(parsed);
    if (!parsed || parsed === ".") {
      setFromValue("");
      return;
    }
    setFromValue(cleanResult(Number(parsed) / rate));
  };

  const handleFromCurrencyChange = (c: keyof Rates) => {
    setFromCurrency(c);
    if (fromValue) {
      setToValue(String((+fromValue * (rates[c] / toRate)).toFixed(2)));
    }
  };

  const handleToCurrencyChange = (c: keyof Rates) => {
    setToCurrency(c);
    if (fromValue) {
      setToValue(String((+fromValue * (fromRate / rates[c])).toFixed(2)));
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  return (
    <div className="bg-white  p-5 rounded-2xl shadow-sm border border-slate-200">
      <div className="bg-slate-100 rounded-xl p-4 border flex flex-col gap-2 border-slate-100">
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
          className="w-full bg-transparent text-3xl font-bold text-slate-800 outline-none text-left"
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

      <div className="bg-slate-100 rounded-xl p-4 border flex flex-col gap-2 border-slate-100">
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
          className="w-full bg-transparent text-emerald-600 text-3xl font-bold outline-none text-left"
        />
      </div>
      {fromValue && toValue && (
        <div className="mt-5 p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-center">
          <p className="text-sm text-indigo-700 font-medium">
            {Number(fromValue).toLocaleString("fa-IR")}{" "}
            {CURRENCY_NAMES[fromCurrency]}
            <span className="mx-2 text-slate-400">=</span>
            {Number(toValue).toLocaleString("fa-IR")}{" "}
            {CURRENCY_NAMES[toCurrency]}
          </p>
        </div>
      )}
    </div>
  );
}
