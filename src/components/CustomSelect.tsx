import { useState, useEffect, useRef } from "react";
import { CURRENCY_NAMES } from "../constants";
import type { Rates } from "../types";

interface CustomSelectProps {
  value: keyof Rates;
  currencies: (keyof Rates)[];
  onChange: (v: keyof Rates) => void;
}

function CustomSelect({ currencies, onChange, value }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 max-w-56" ref={dropdownRef}>
      {/* دکمه اصلی */}
      <button
        className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer justify-between w-full hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <img src={`/logos/${value}.png`} alt={value} className="size-6" />
          <span>{CURRENCY_NAMES[value]}</span>
        </div>
        <img
          src="/icons/chevron-down.svg"
          alt="▼"
          className={`size-4 dark:invert transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl overflow-y-auto max-h-60 divide-y divide-slate-100 dark:divide-slate-700/50 dark:scheme-dark">
          {currencies.map((key) => (
            <button
              key={key}
              onClick={() => {
                onChange(key);
                setIsOpen(false);
              }}
              type="button"
              className="w-full bg-white dark:bg-slate-800 cursor-pointer px-3 py-2 text-right text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 flex items-center gap-2 transition-colors"
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
  );
}

export default CustomSelect;
