"use client";

import { useAuthFormsStore } from "../../stores/authFormsStore";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { RegisterForm } from "./components/RegisterForm/RegisterForm";

export function AuthForms() {
  const { registerIsOpen, loginIsOpen } = useAuthFormsStore();

  return (
    <>
      {registerIsOpen && <RegisterForm />}
      {loginIsOpen && <LoginForm />}
    </>
  );
}
