import { useTheme } from "../hooks/useTheme";
import { toPersianNumber } from "../utils";
interface HeaderProps {
  date: string;
  time: string;
}

export function Header({ date, time }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className=" sticky top-0 z-10 bg-slate-100 py-3 md:py-5 border-b border-slate-200">
      <div className="container mx-auto px-4 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="RIRA logo" className="size-12" />
          <div>
            <h1 className="text-xl font-bold text-indigo-600">ریرا ارز</h1>
            <p className="text-sm text-slate-600 mt-0.5">
              آخرین به‌روزرسانی: {toPersianNumber(date)} -{" "}
              {toPersianNumber(time)}
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition shrink-0 cursor-pointer"
        >
          <img
            src={isDark ? "/icons/sun.svg" : "/icons/moon.svg"}
            alt="theme"
            className="size-8"
          />
        </button>
      </div>
    </header>
  );
}
