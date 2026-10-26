import { CURRENCY_NAMES } from "../constants";
import type { Rates } from "../types";

interface Props {
  rates: Rates;
}

export function PriceList({ rates }: Props) {
  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center gap-1 text-sm text-slate-600">
          <img
            src="/icons/information-circle.svg"
            alt="info"
            className="size-5 brightness-0 opacity-70"
          />
          <span>
            قیمت‌ها به <span className="font-bold text-slate-700">تومان</span>{" "}
            است.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {Object.entries(rates).map(([key, price]) => {
          if (!CURRENCY_NAMES[key]) return null;

          return (
            <div key={key} className="flex items-center justify-between p-4 w-full bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 shrink-0">
                <img
                  src={`/logos/${key}.png`}
                  alt={CURRENCY_NAMES[key]}
                  className="size-10"
                />
                <span>{CURRENCY_NAMES[key]}</span>
              </div>
              <span className="font-bold text-emerald-600">
                {price.toLocaleString("fa-IR")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
