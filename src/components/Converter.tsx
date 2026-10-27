import type { Rates } from "../types";
import CustomSelect from "./CustomSelect";
interface ConverterProps {
  rates: Rates;
  fromCurrency: string;
  setFromCurrency: (c: string) => void;
  toCurrency: string;
  setToCurrency: (c: string) => void;
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
  const rateKeys = Object.keys(rates);
  return (
    <div className="bg-white  p-5 rounded-2xl shadow-sm border border-slate-200">
      <div className="bg-slate-100 rounded-xl p-4 border flex flex-col gap-2 border-slate-100">
        <div className="flex items-center gap-2">
          <span className=" text-slate-600">از</span>

          <CustomSelect
            currencies={rateKeys}
            onChange={setFromCurrency}
            value={fromCurrency}
          />
        </div>
        <input
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
          type="number"
          placeholder="0"
          className="w-full bg-transparent text-3xl  font-bold text-slate-800 outline-none text-left"
          dir="ltr"
        />
      </div>

      <div className="flex justify-center -my-3.5">
        <button className="bg-indigo-600 size-10 flex items-center justify-center text-white text-lg rounded-full shadow-lg cursor-pointer">
          ⇅
        </button>
      </div>

      <div className="bg-slate-100 rounded-xl p-4 border flex flex-col gap-2 border-slate-100">
        <div className="flex items-center gap-2">
          <span className=" text-slate-600">به</span>
          <CustomSelect
            currencies={rateKeys}
            onChange={setToCurrency}
            value={toCurrency}
          />
        </div>
        <input
          value={toValue}
          onChange={(e) => setToValue(e.target.value)}
          type="number"
          placeholder="0"
          className="w-full bg-transparent text-3xl font-bold text-slate-800 outline-none text-left"
          dir="ltr"
        />
      </div>
    </div>
  );
}
