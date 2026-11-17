import { useEffect, useReducer, useState } from "react";
import { BuildSummary } from "./build-summary/build-summary";
import { PartCard } from "./part-card/part-card";
import {
  PARTS_DATA,
  type BuildState,
  buildReducer,
  initialState,
} from "./assets/parts";

const STORAGE_KEY = "pc-configurator-build";

function loadInitialState(defaultState: BuildState): BuildState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultState;
  } catch {
    return defaultState;
  }
}

function App() {
  const [state, dispatch] = useReducer(buildReducer, initialState, loadInitialState);

  // Локальные состояния (Пункт 2.Б)
  const [activeTab, setActiveTab] = useState<keyof BuildState>("cpu");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Автосохранение и уведомление на 2 секунды (Пункт 2.В)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    setShowSavedToast(true);
    const timerId = setTimeout(() => {
      setShowSavedToast(false);
    }, 2000);

    return () => clearTimeout(timerId);
  }, [state]);

  // Фильтрация деталей для активной вкладки
  const filteredParts = PARTS_DATA.filter(
    (part) => part.category === activeTab && (!onlyInStock || part.inStock)
  );

  // Подсчет энергопотребления и стоимости
  const totalWatts =
    (state.cpu?.watts || 0) +
    (state.gpu?.watts || 0) +
    (state.ram?.watts || 0);

  const totalPrice =
    (state.cpu?.price || 0) +
    (state.gpu?.price || 0) +
    (state.ram?.price || 0) +
    (state.psu?.price || 0);

  // Проверка предупреждений
  const warnings: string[] = [];
  if (!state.cpu) {
    warnings.push("Не выбран процессор");
  }
  if (!state.psu) {
    warnings.push("Не выбран блок питания");
  } else if (totalWatts > state.psu.maxWatts) {
    warnings.push("Внимание: мощность БП меньше потребления системы!");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Конфигуратор ПК</h1>
            <p className="text-slate-400 mt-1">
              Выберите комплектующие для расчета мощности и стоимости
            </p>
          </div>

          <div className="flex items-center gap-4">
            {showSavedToast && (
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                Конфигурация сохранена...
              </span>
            )}
            <button
              type="button"
              onClick={() => dispatch({ type: "RESET_BUILD" })}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              Сбросить сборку
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            {/* Панель вкладок и фильтр */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex flex-wrap gap-2">
                {(["cpu", "gpu", "ram", "psu"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold uppercase transition ${
                      activeTab === tab
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                />
                Только в наличии
              </label>
            </div>

            {/* Сетка карточек выбранной категории */}
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredParts.map((part) => (
                  <PartCard
                    key={part.id}
                    part={part}
                    isSelected={state[part.category]?.id === part.id}
                    onSelect={(selected) =>
                      dispatch({ type: "SELECT_PART", payload: selected })
                    }
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Боковая панель со сводкой */}
          <div className="lg:col-span-1">
            <BuildSummary
              selectedParts={state}
              totalWatts={totalWatts}
              totalPrice={totalPrice}
              warnings={warnings}
              onRemove={(category) =>
                dispatch({ type: "REMOVE_PART", payload: category })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
