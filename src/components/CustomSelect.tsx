import { useState ,useEffect , useRef } from "react";
import { CURRENCY_NAMES } from "../constants";

interface CustomSelectProps {
  value: string;
  currencies: string[];
  onChange: (v: string) => void;
}

function CustomSelect({ currencies, onChange, value }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className=" relative flex-1 max-w-56" ref={dropdownRef}>
      <button
        className="flex items-center bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-700 outline-none shadow-md cursor-pointer justify-between w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <img src={`/logos/${value}.png`} alt={value} className="size-6" />
          <span>{CURRENCY_NAMES[value]}</span>
        </div>
        <img src="/icons/chevron-down.svg" alt="▼" className="size-4" />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border-slate-200 rounded-lg shadow-xl overflow-y-auto max-h-60">
          {currencies.map((key) => (
            <button
              key={key}
              onClick={() => {
                onChange(key);
                setIsOpen(false);
              }}
              type="button"
              className="w-full bg-white cursor-pointer px-3 py-2 text-right text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <img
                src={`/logos/${key}.png`}
                alt=""
                className="w-5 h-5 object-contain"
              />
              <span>{CURRENCY_NAMES[key]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
