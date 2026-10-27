import { CURRENCY_NAMES } from "../constants";
import type { Rates } from "../types";

interface Props {
  rates: Rates;
  onSelect: (currency: keyof Rates) => void;
}

export function PriceList({ rates, onSelect }: Props) {
  return (
    <div>
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-1 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          <img
            src="/icons/information-circle.svg"
            alt="info"
            className="size-5 dark:invert"
          />
          <span>
            قیمت‌ها به <span className="font-bold text-slate-700 dark:text-slate-200">تومان</span>{" "}
            است.
          </span>
        </div>
        <div className="flex items-center gap-1  text-sm sm:text-base text-slate-600 dark:text-slate-400">
          <img
            src="/icons/information-circle.svg"
            alt="info"
            className="size-5 dark:invert"
          />
          <span>برای تبدیل سریع، روی ارز مورد نظر خود کلیک کنید.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-4">
        {Object.entries(rates).map(([key, price]) => {
          if (key === "IR" || !CURRENCY_NAMES[key]) return null;

          return (
            <div
              key={key}
              onClick={() => onSelect(key as keyof Rates)}
              className="flex items-center justify-between p-2 md:p-4 w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:shadow-md cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-all group "
            >
              <div className="flex items-center gap-2 shrink-0">
                <img
                  src={`/logos/${key}.png`}
                  alt={CURRENCY_NAMES[key]}
                  className="size-10 group-hover:scale-110 transition-transform"
                />
                <span className="text-slate-700 dark:text-slate-200">{CURRENCY_NAMES[key]}</span>
              </div>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {price.toLocaleString("fa-IR")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
