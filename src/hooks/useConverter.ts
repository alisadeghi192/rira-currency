import { useState } from "react";
import type { Rates } from "../types";
import { cleanResult, parseInput } from "../utils";

export function useConverter(rates: Rates) {
  const [fromCurrency, setFromCurrency] = useState<keyof Rates>("dollar");
  const [toCurrency, setToCurrency] = useState<keyof Rates>("IR");

  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
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
    setToValue(cleanResult(+fromValue * (rates[c] / toRate)));
  }
};

const handleToCurrencyChange = (c: keyof Rates) => {
    setToCurrency(c);
    if (fromValue) {
      setToValue(cleanResult(+fromValue * (fromRate / rates[c])));
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromValue(toValue);
    setToValue(fromValue);
  };

    const selectCurrency = (currency: keyof Rates) => {
    setFromCurrency(currency);
    setToCurrency("IR");
    setFromValue("1");
    setToValue(cleanResult(1 * (rates[currency] / (rates["IR"] || 1))));
  };
  return {
    fromCurrency,
    toCurrency,
    fromValue,
    toValue,
    rate,
    handleFromChange,
    handleToChange,
    handleFromCurrencyChange,
    handleToCurrencyChange,
    handleSwap,
    selectCurrency
  };
}
