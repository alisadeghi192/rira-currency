import { useState, useEffect } from "react";
import type { ApiResponse } from "../types";

export function useRates() {
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
          rates: { ...json.rates, IR: 1 },
        });
      } catch (error) {
        setError("خطا در دریافت اطلاعات ");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
