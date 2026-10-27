import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { PriceList } from "./components/PriceList";
import type { ApiResponse , Rates } from "./types";
import { Converter } from "./components/Converter";

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [fromCurrency, setFromCurrency] = useState<keyof Rates>("dollar");
  const [toCurrency, setToCurrency] = useState<keyof Rates>("IR");

  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data/live.json");
        const json = await response.json();
        setData({
          date: json.date,
          time: json.time,
          rates: {...json.rates , IR : 1},
        });
      } catch (error) {
        setError(`خطا در دریافت اطلاعات : ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        در حال بارگذاری...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500">
        {error}
      </div>
    );
  if (!data) return null;
  return (
    <div className="min-h-screen bg-slate-100">
      <Header date={data.date} time={data.time} />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex gap-8 flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-1/2">
            <PriceList rates={data.rates} />
          </div>
          <div className="w-full lg:sticky h-fit lg:top-27 lg:w-1/2">
            <Converter
              rates={data.rates}
              fromCurrency={fromCurrency}
              setFromCurrency={setFromCurrency}
              toCurrency={toCurrency}
              setToCurrency={setToCurrency}
              fromValue={fromValue}
              setFromValue={setFromValue}
              toValue={toValue}
              setToValue={setToValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
