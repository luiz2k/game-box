import { create } from "zustand";

type AuthFormsStore = {
  registerIsOpen: boolean;
  handleRegisterIsOpen: () => void;

  loginIsOpen: boolean;
  handleLoginIsOpen: () => void;

  changeForm: () => void;
};

// Responsavel por controlar a visibilidade dos formulário de registro e login
export const useAuthFormsStore = create<AuthFormsStore>()((set) => ({
  registerIsOpen: false,
  handleRegisterIsOpen: () =>
    set((state) => ({ registerIsOpen: !state.registerIsOpen })),

  loginIsOpen: false,
  handleLoginIsOpen: () =>
    set((state) => ({ loginIsOpen: !state.loginIsOpen })),

  changeForm: () =>
    set((state) => ({
      registerIsOpen: !state.registerIsOpen,
      loginIsOpen: !state.loginIsOpen,
    })),
}));
