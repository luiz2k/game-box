"use client";

import { useFormStore } from "../../stores/formStore";
import { LoginForm } from "./LoginForm/LoginForm";
import { RegisterForm } from "./RegisterForm/RegisterForm";

export function AuthForms() {
  const { registerFormIsOpen, loginFormIsOpen } = useFormStore();

  return (
    <>
      {registerFormIsOpen && <RegisterForm />}
      {loginFormIsOpen && <LoginForm />}
    </>
  );
}
