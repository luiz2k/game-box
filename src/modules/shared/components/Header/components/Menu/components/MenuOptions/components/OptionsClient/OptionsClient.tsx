"use client";

import { useFormStore } from "@/modules/shared/stores/formStore";
import { MenuOption } from "../../../MenuOption/MenuOption";
import { KeyRound, LogIn } from "lucide-react";

export function OptionsClient() {
  const { handleLoginForm, handleRegisterForm } = useFormStore();

  return (
    <>
      <li>
        <MenuOption icon={LogIn} name="Entrar" onClick={handleLoginForm} />
      </li>
      <li>
        <MenuOption
          icon={KeyRound}
          name="Registrar"
          onClick={handleRegisterForm}
        />
      </li>
    </>
  );
}
