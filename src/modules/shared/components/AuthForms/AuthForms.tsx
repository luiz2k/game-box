"use client";

import { useFormStore } from "../../stores/formStore";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { RegisterForm } from "./components/RegisterForm/RegisterForm";

export function AuthForms() {
  const { registerFormIsOpen, loginFormIsOpen } = useFormStore();

  return (
    <>
      {registerFormIsOpen && <RegisterForm />}
      {loginFormIsOpen && <LoginForm />}
    </>
  );
}
