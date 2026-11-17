import { type BuildState } from "../assets/parts";
import { PowerMeter } from "../power-meter/power-meter";

interface BuildSummaryProps {
  selectedParts: BuildState; // Заменили { cpu: CPU; ... } на BuildState (где есть | null)
  totalWatts: number;
  totalPrice: number;
  warnings: string[];
  onRemove?: (category: keyof BuildState) => void;
}


export function BuildSummary({
  selectedParts,
  totalWatts,
  totalPrice,
  warnings,
}: BuildSummaryProps) {
  const rows = [
    { label: 'Процессор', item: selectedParts.cpu },
    { label: 'Видеокарта', item: selectedParts.gpu },
    { label: 'Память (RAM)', item: selectedParts.ram },
    { label: 'Блок питания', item: selectedParts.psu },
  ];

  return (
    <aside className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 sticky top-6">
      <h2 className="text-lg font-bold text-white">Ваша сборка</h2>

      {/* Список выбранных комплектующих */}
      <div className="space-y-3 divide-y divide-slate-800/80">
        {rows.map(({ label, item }) => (
          <div key={label} className="pt-3 first:pt-0 flex justify-between gap-3 text-sm">
            <div className="min-w-0">
              <span className="text-xs text-slate-500 block">{label}</span>
              <span className={`truncate block font-medium ${item ? 'text-slate-200' : 'text-slate-600 italic'}`}>
                {item ? item.name : 'Не выбрано'}
              </span>
            </div>
            {item && (
              <div className="text-right shrink-0">
                <span className="text-slate-200 font-semibold block">
                  {item.price.toLocaleString('ru-RU')} ₽
                </span>
                <span className="text-xs text-slate-500">
                  {'maxWatts' in item ? `${item.maxWatts} Вт` : `${item.watts} Вт`}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Индикатор нагрузки */}
      <PowerMeter
        currentWatts={totalWatts}
        maxWatts={selectedParts.psu ? selectedParts.psu.maxWatts : 0}
      />


      {/* Предупреждения */}
      {warnings.length > 0 && (
        <div className="space-y-2">
          {warnings.map((warning, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs leading-relaxed"
            >
              {warning}
            </div>
          ))}
        </div>
      )}

      {/* Итоговая стоимость */}
      <div className="pt-4 border-t border-slate-800 flex items-baseline justify-between">
        <span className="text-sm text-slate-400">Итоговая цена:</span>
        <span className="text-2xl font-black text-white">
          {totalPrice.toLocaleString('ru-RU')} ₽
        </span>
      </div>
    </aside>
  );
}
