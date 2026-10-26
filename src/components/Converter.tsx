export function Converter() {
  return (
    <div className="bg-white  p-5 rounded-2xl shadow-sm border border-slate-200">
      <div className="bg-slate-100 rounded-xl p-4 border flex flex-col gap-2 border-slate-100">
        <div className="flex items-center gap-2">
          <span className=" text-slate-600">از</span>
          <select className="bg-white border flex-1 max-w-56 border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-700 outline-none shadow-md">
            <option>دلار آمریکا</option>
            <option>یورو</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="0"
          className="w-full bg-transparent text-3xl  font-bold text-slate-800 outline-none text-left"
          dir="ltr"
        />
      </div>

      <div className="flex justify-center -my-3.5">
        <button className="bg-indigo-600 size-10 flex items-center justify-center text-white text-lg rounded-full shadow-lg cursor-pointer">
          ⇅
        </button>
      </div>

      <div className="bg-slate-100 rounded-xl p-4 border flex flex-col gap-2 border-slate-100">
        <div className="flex items-center gap-2">
          <span className=" text-slate-600">به</span>
          <select className="bg-white border flex-1 max-w-56 border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-700 outline-none shadow-md">
            <option>دلار آمریکا</option>
            <option>یورو</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="0"
          className="w-full bg-transparent text-3xl font-bold text-slate-800 outline-none text-left"
          dir="ltr"
        />
      </div>
    </div>
  );
}
