import { useState } from "react";
import { CURRENCY_NAMES } from "../constants";
import type { Rates } from "../types";
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
  const [isFromMenuOpen, setIsFromMenuOpen] = useState(false);
  const [isToMenuOpen, setIsToMenuOpen] = useState(false);

  const rateKeys = Object.keys(rates);

  return (
    <div className="bg-white  p-5 rounded-2xl shadow-sm border border-slate-200">
      <div className="bg-slate-100 rounded-xl p-4 border flex flex-col gap-2 border-slate-100">
        <div className="flex items-center gap-2">
          <span className=" text-slate-600">از</span>

          <div className=" relative flex-1 max-w-56">
            <button
              className="flex items-center bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-700 outline-none shadow-md cursor-pointer justify-between w-full"
              onClick={() => setIsFromMenuOpen(!isFromMenuOpen)}
            >
              <div className="flex items-center gap-2">
                <img
                  src={`/logos/${fromCurrency}.png`}
                  alt={fromCurrency}
                  className="size-6"
                />
                <span>{CURRENCY_NAMES[fromCurrency]}</span>
              </div>
              <img src="/icons/chevron-down.svg" alt="▼" className="size-4" />
            </button>
            {isFromMenuOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border-slate-200 rounded-lg shadow-xl overflow-y-auto max-h-60">
                {rateKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setFromCurrency(key);
                      setIsFromMenuOpen(false);
                    }}
                    type="button"
                    className="w-full bg-white cursor-pointer px-3 py-2 text-right text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                  >
                    <img
                      src={`/logos/${key}.png`}
                      alt=""
                      className="w-5 h-5 object-contain"
                    />
                    <span>{CURRENCY_NAMES[key]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
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
          <div className=" relative flex-1 max-w-56">
            <button
              className="flex items-center bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-700 outline-none shadow-md cursor-pointer justify-between w-full"
              onClick={() => setIsToMenuOpen(!isToMenuOpen)}
            >
              <div className="flex items-center gap-2">
                <img
                  src={`/logos/${toCurrency}.png`}
                  alt={toCurrency}
                  className="size-6"
                />
                <span>{CURRENCY_NAMES[toCurrency]}</span>
              </div>
              <img src="/icons/chevron-down.svg" alt="▼" className="size-4" />
            </button>
            {isToMenuOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border-slate-200 rounded-lg shadow-xl overflow-y-auto max-h-60">
                {rateKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setToCurrency(key);
                      setIsToMenuOpen(false);
                    }}
                    type="button"
                    className="w-full cursor-pointer px-3 py-2 text-right text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                  >
                    <img
                      src={`/logos/${key}.png`}
                      alt=""
                      className="w-5 h-5 object-contain"
                    />
                    <span>{CURRENCY_NAMES[key]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
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
