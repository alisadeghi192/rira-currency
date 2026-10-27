import type { Rates } from "../types";
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
  const rateKeys = Object.keys(rates);

  const fromCurrencies = rateKeys.filter((key) => key !== toCurrency);
  const toCurrencies = rateKeys.filter((key) => key !== fromCurrency);

  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];

  const rate = fromRate / toRate;
  console.log(rate)

  const handleFromChange = (val: string) => {
    setFromValue(val);
    if (!val) {
      setToValue("");
      return;
    }
    setToValue(String(+(val) * rate));
  };

  const handleToChange = (val: string) => {
    setToValue(val);
    if (!val) {
      setFromValue("");
      return;
    }
    setFromValue(String(+(val) / rate));
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
            onChange={setFromCurrency}
            value={fromCurrency}
          />
        </div>
        <input
          value={fromValue}
          onChange={(e) => handleFromChange(e.target.value)}
          type="number"
          placeholder="0"
          className="w-full bg-transparent text-3xl  font-bold text-slate-800 outline-none text-left"
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

      <div className="bg-slate-100 rounded-xl p-4 border flex flex-col gap-2 border-slate-100">
        <div className="flex items-center gap-2">
          <span className=" text-slate-600">به</span>
          <CustomSelect
            currencies={toCurrencies}
            onChange={setToCurrency}
            value={toCurrency}
          />
        </div>
        <input
          value={toValue}
          onChange={(e) => handleToChange(e.target.value)}
          type="number"
          placeholder="0"
          className="w-full bg-transparent text-3xl font-bold text-slate-800 outline-none text-left"
          dir="ltr"
        />
      </div>
    </div>
  );
}
