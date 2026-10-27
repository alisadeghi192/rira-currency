import type { Rates } from "../types";
import { CurrencyInput } from "./CurrencyInput";
import { ConversionSummary } from "./ConversionSummary";

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

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
      <CurrencyInput
        label="از"
        value={fromValue}
        currency={fromCurrency}
        currencies={rateKeys.filter((k) => k !== toCurrency)}
        onChangeValue={handleFromChange}
        onChangeCurrency={handleFromCurrencyChange}
      />

      <div className="flex justify-center -my-3.5">
        <button
          onClick={handleSwap}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-full shadow-lg border border-indigo-200 transition-transform hover:scale-110 cursor-pointer"
        >
          <img src="/icons/arrows-up-down.svg" alt="⇅" className="size-5" />
        </button>
      </div>

      <CurrencyInput
        label="به"
        value={toValue}
        currency={toCurrency}
        currencies={rateKeys.filter((k) => k !== fromCurrency)}
        onChangeValue={handleToChange}
        onChangeCurrency={handleToCurrencyChange}
        textColor="text-emerald-600"
      />

      <ConversionSummary
        fromValue={fromValue}
        toValue={toValue}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />
    </div>
  );
}