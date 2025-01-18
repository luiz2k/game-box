import { create } from "zustand";

type DeleteCustomBoxDialogStore = {
  box: {
    id: number;
    name: string;
  };
  setBox: ({ id, name }: { id: number; name: string }) => void;
  dialogFormIsOpen: boolean;
  handleDialogForm: () => void;
};

// Responsavel por controlar a visibilidade dos formulário de exclusão de jogo
export const useDeleteCustomBoxDialogStore =
  create<DeleteCustomBoxDialogStore>()((set) => ({
    box: { id: 0, name: "" },
    setBox: ({ id, name }) => set({ box: { id: id, name: name } }),
    dialogFormIsOpen: false,
    handleDialogForm: () =>
      set((state) => ({ dialogFormIsOpen: !state.dialogFormIsOpen })),
  }));
