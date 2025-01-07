import { create } from "zustand";

type FormStore = {
  registerFormIsOpen: boolean;
  handleRegisterForm: () => void;

  loginFormIsOpen: boolean;
  handleLoginForm: () => void;

  changeForm: () => void;
};

// Responsavel por controlar a visibilidade dos formulário de registro e login
export const useFormStore = create<FormStore>()((set) => ({
  registerFormIsOpen: false,
  handleRegisterForm: () =>
    set((state) => ({ registerFormIsOpen: !state.registerFormIsOpen })),

  loginFormIsOpen: false,
  handleLoginForm: () =>
    set((state) => ({ registerFormIsOpen: !state.registerFormIsOpen })),

  changeForm: () =>
    set((state) => ({
      registerFormIsOpen: !state.registerFormIsOpen,
      loginFormIsOpen: !state.loginFormIsOpen,
    })),
}));
