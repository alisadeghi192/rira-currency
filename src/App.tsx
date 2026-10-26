import { useEffect } from "react";
import { Header } from "./components/Header";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data/live.json');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log("ERROR: ", error);
      }
    };

    fetchData()
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header />
      </div>
    </div>
  );
}

export default App;
