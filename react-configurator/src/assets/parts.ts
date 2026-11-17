export const PARTS_DATA: AnyPart[] = [
  // Процессоры
  { id: 'cpu-1', category: 'cpu', name: 'AMD Ryzen 5 7500F', price: 16500, watts: 65, socket: 'AM5', inStock: true },
  { id: 'cpu-2', category: 'cpu', name: 'Intel Core i5-13600KF', price: 28000, watts: 125, socket: 'LGA1700', inStock: true },
  { id: 'cpu-3', category: 'cpu', name: 'AMD Ryzen 7 7800X3D', price: 42000, watts: 120, socket: 'AM5', inStock: false },

  // Видеокарты
  { id: 'gpu-1', category: 'gpu', name: 'NVIDIA RTX 4060 8GB', price: 34000, watts: 115, inStock: true },
  { id: 'gpu-2', category: 'gpu', name: 'AMD RX 7800 XT 16GB', price: 56000, watts: 263, inStock: true },
  { id: 'gpu-3', category: 'gpu', name: 'NVIDIA RTX 4080 Super', price: 115000, watts: 320, inStock: true },

  // Оперативная память
  { id: 'ram-1', category: 'ram', name: '16GB DDR5 5200MHz', price: 6500, watts: 10, inStock: true },
  { id: 'ram-2', category: 'ram', name: '32GB DDR5 6000MHz RGB', price: 12500, watts: 15, inStock: true },

  // Блоки питания (watts здесь — максимальная отдаваемая мощность)
  { id: 'psu-1', category: 'psu', name: 'DeepCool 500W Bronze', price: 4500, maxWatts: 500, inStock: true },
  { id: 'psu-2', category: 'psu', name: 'MSI 750W Gold Modular', price: 10500, maxWatts: 750, inStock: true },
  { id: 'psu-3', category: 'psu', name: 'BeQuiet 1000W Platinum', price: 19000, maxWatts: 1000, inStock: false },
];
export type BasePart = {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
};

export type CPU = BasePart & {
  category: 'cpu';
  watts: number;
  socket: string;
};

export type GPU = BasePart & {
  category: 'gpu';
  watts: number;
};

export type RAM = BasePart & {
  category: 'ram';
  watts: number;
};

export type PSU = BasePart & {
  category: 'psu';
  maxWatts: number; // С маленькой буквы, как в PARTS_DATA
};

export interface BuildState {
  cpu: CPU | null;
  gpu: GPU | null;
  ram: RAM | null;
  psu: PSU | null;
}
export type BuildAction =
  | { type: "SELECT_PART"; payload: AnyPart }
  | { type: "REMOVE_PART"; payload: keyof BuildState }
  | { type: "RESET_BUILD" };

export const initialState: BuildState = {
  cpu: null,
  gpu: null,
  ram: null,
  psu: null,
};

export function buildReducer(state: BuildState, action: BuildAction): BuildState {
  switch (action.type) {
    case "SELECT_PART": {
      const part = action.payload;
      return {
        ...state,
        [part.category]: part,
      };
    }

    case "REMOVE_PART": {
      const category = action.payload;
      return {
        ...state,
        [category]: null,
      };
    }

    case "RESET_BUILD": {
      return initialState;
    }

    default:
      return state;
  }
}
export type AnyPart = CPU | GPU | RAM | PSU;
