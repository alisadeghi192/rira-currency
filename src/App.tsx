import { Header } from "./components/Header";
import { PriceList } from "./components/PriceList";
import type { Rates } from "./types";
import { Converter } from "./components/Converter";
import { useConverter } from "./hooks/useConverter";
import { useRates } from "./hooks/useRates";

function App() {
  const { data, loading, error } = useRates();
  const converter = useConverter(data?.rates || ({} as Rates));

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        در حال بارگذاری...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500 dark:bg-slate-900">
        {error}
      </div>
    );
  if (!data) return null;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <Header date={data.date} time={data.time} />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex gap-8 flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-1/2">
            <PriceList rates={data.rates} onSelect={converter.selectCurrency} />
          </div>
          <div className="w-full lg:sticky h-fit lg:top-27 lg:w-1/2">
            <Converter rates={data.rates} {...converter} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
