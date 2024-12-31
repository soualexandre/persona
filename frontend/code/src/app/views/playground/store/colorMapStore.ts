import { create } from "zustand";

interface IdColorMapState {
  idColorMap: { [key: string]: string };
  setIdColorMap: (newMap: { [key: string]: string }) => void;
  updateColor: (id: string, color: string) => void;
  resetColorMap: () => void;
}

const useColorMapStore = create<IdColorMapState>((set) => ({
  idColorMap: {},

  setIdColorMap: (newMap) =>
    set(() => ({
      idColorMap: newMap,
    })),

  updateColor: (id, color) =>
    set((state) => ({
      idColorMap: {
        ...state.idColorMap,
        [id]: color,
      },
    })),

  resetColorMap: () =>
    set(() => ({
      idColorMap: {},
    })),
}));

export default useColorMapStore;
