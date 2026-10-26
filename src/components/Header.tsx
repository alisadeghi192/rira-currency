import { useState } from "react";

type theme = "light" | "dark";

export function Header() {
  const [theme, setTheme] = useState<theme>("light");
  const isDark = theme === "dark"
  return (
    <header className="flex items-center justify-between py-5 mb-6 border-b border-slate-200">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="RIRA logo" className="size-12" />
        <div>
          <h1 className="text-xl font-bold text-indigo-600">ریرا ارز</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            آخرین به‌روزرسانی: 1405/08/03 - 16:00
          </p>
        </div>
      </div>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition shrink-0 cursor-pointer"
      >
        <img
          src={isDark ? "/icons/sun.svg" : "/icons/moon.svg"}
          alt="theme"
          className="size-5 "
        />
      </button>
    </header>
  );
}
