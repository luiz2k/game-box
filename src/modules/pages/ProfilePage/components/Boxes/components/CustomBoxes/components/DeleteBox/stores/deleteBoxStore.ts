import { create } from "zustand";

type DeleteBoxStore = {
  box: {
    id: number;
    name: string;
  };
  setBox: ({ id, name }: { id: number; name: string }) => void;
  isOpen: boolean;
  handleIsOpen: () => void;
};

// Responsavel por controlar a visibilidade dos formulário de exclusão de jogo
export const useDeleteBoxStore = create<DeleteBoxStore>()((set) => ({
  box: { id: 0, name: "" },
  setBox: ({ id, name }) => set({ box: { id: id, name: name } }),
  isOpen: false,
  handleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
