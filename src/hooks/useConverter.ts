import { useEffect, useState } from "react";
import type { Rates } from "../types";
import { cleanResult } from "../utils";

export function useConverter(rates: Rates) {
  const [fromCurrency, setFromCurrency] = useState<keyof Rates>("dollar");
  const [toCurrency, setToCurrency] = useState<keyof Rates>("IR");

  const [fromValue, setFromValue] = useState("1");
  const [toValue, setToValue] = useState("");
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  const rate = fromRate / toRate;

  useEffect(() => {
    if (rates["dollar"] && rates["IR"]) {
      setToValue(cleanResult(1 * (rates["dollar"] / rates["IR"])));
    }
  }, [rates]);

  const handleFromChange = (val: string) => {
    setFromValue(val);
    if (!val  || val  === ".") {
      setToValue("");
      return;
    }
    setToValue(cleanResult(Number(val ) * rate));
  };

  const handleToChange = (val: string) => {
    setToValue(val);
    if (!val || val === ".") {
      setFromValue("");
      return;
    }
    setFromValue(cleanResult(Number(val) / rate));
  };

  const handleFromCurrencyChange = (c: keyof Rates) => {
    setFromCurrency(c);
    if (fromValue) {
      const newRate = (rates[c] || 1) / toRate;
      setToValue(cleanResult(+fromValue * newRate));
    }
  };

  const handleToCurrencyChange = (c: keyof Rates) => {
    setToCurrency(c);
    if (fromValue) {
      const newRate = fromRate / (rates[c] || 1);
      setToValue(cleanResult(+fromValue * newRate));
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
    selectCurrency,
  };
}
