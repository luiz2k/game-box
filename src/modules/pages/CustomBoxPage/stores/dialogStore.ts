import { create } from "zustand";

type dialogStore = {
  game: {
    id: number;
    title: string;
  };
  setGame: ({ id, title }: { id: number; title: string }) => void;
  isOpen: boolean;
  handleIsOpen: () => void;
};

// Responsavel por controlar a visibilidade dos formulário de exclusão de jogo
export const useDialogStore = create<dialogStore>()((set) => ({
  game: { id: 0, title: "" },
  setGame: ({ id, title }) => set({ game: { id: id, title: title } }),
  isOpen: false,
  handleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
