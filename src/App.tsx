import { useEffect, useState } from "react";
import { Header } from "./components/Header";

function App() {
  const [updatedAt, setUpdatedAt] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data/live.json");
        const data = await response.json();
        setUpdatedAt({ date: data.date, time: data.time });
        console.log(data);
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
  if (!updatedAt) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header date={updatedAt.date} time={updatedAt.time} />
      </div>
    </div>
  );
}

export default App;
