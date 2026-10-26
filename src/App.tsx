import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { PriceList } from "./components/PriceList";
import type { ApiResponse } from "./types";

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data/live.json");
        const json = await response.json();
        setData({
          date: json.date,
          time: json.time,
          rates: json.rates,
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
  console.log(data);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header date={data.date} time={data.time} />
        <PriceList rates={data.rates} />
      </div>
    </div>
  );
}

export default App;
