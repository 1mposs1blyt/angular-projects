import { type AnyPart } from "../assets/parts";

interface PartCardProps {
  part: AnyPart;
  isSelected: boolean;
  onSelect: (part: AnyPart) => void;
}

export function PartCard({ part, isSelected, onSelect }: PartCardProps) {
  return (
    <div
      onClick={() => onSelect(part)}
      className={`cursor-pointer rounded-xl border p-4 transition-all flex flex-col justify-between ${
        isSelected
          ? "bg-indigo-600/15 border-indigo-500 shadow-lg shadow-indigo-500/10"
          : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-100 leading-snug">{part.name}</h3>
          <span
            className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-md ${
              part.category === "psu"
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-amber-500/15 text-amber-400"
            }`}
          >
            {part.category === "psu" ? `+${part.maxWatts} Вт` : `${part.watts} Вт`}
          </span>
        </div>

        {"socket" in part && (
          <p className="text-xs text-slate-400 mt-1.5">Сокет: {part.socket}</p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-base font-bold text-white">
          {part.price.toLocaleString("ru-RU")} ₽
        </span>

        <button
          type="button"
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            isSelected
              ? "bg-indigo-500 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          {isSelected ? "Выбрано" : "Выбрать"}
        </button>
      </div>
    </div>
  );
}
