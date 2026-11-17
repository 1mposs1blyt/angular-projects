interface PowerMeterProps {
  currentWatts: number;
  maxWatts: number;
}

export function PowerMeter({ currentWatts, maxWatts }: PowerMeterProps) {
  const percentage = maxWatts > 0 ? Math.round((currentWatts / maxWatts) * 100) : 0;
  const clampedWidth = Math.min(percentage, 100);
  const isOverloaded = maxWatts > 0 && currentWatts > maxWatts;
  const isHighLoad = !isOverloaded && percentage >= 80;

  return (
    <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-xs text-slate-400 block">Нагрузка на БП</span>
          <span className="text-sm font-semibold text-slate-200">
            {currentWatts} Вт <span className="text-slate-500">/ {maxWatts} Вт</span>
          </span>
        </div>
        <span
          className={`text-sm font-bold ${
            isOverloaded
              ? 'text-rose-400'
              : isHighLoad
              ? 'text-amber-400'
              : 'text-emerald-400'
          }`}
        >
          {maxWatts > 0 ? `${percentage}%` : '—'}
        </span>
      </div>

      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isOverloaded
              ? 'bg-rose-500'
              : isHighLoad
              ? 'bg-amber-500'
              : 'bg-emerald-500'
          }`}
          style={{ width: `${maxWatts > 0 ? clampedWidth : 0}%` }}
        />
      </div>
    </div>
  );
}
