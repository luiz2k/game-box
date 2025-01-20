"use client";

import { useAuthFormsStore } from "@/modules/shared/stores/authFormsStore";
import { MenuOption } from "../../../MenuOption/MenuOption";
import { KeyRound, LogIn } from "lucide-react";

export function OptionsClient() {
  const { handleLoginIsOpen, handleRegisterIsOpen } = useAuthFormsStore();

  return (
    <>
      <li>
        <MenuOption icon={LogIn} name="Entrar" onClick={handleLoginIsOpen} />
      </li>
      <li>
        <MenuOption
          icon={KeyRound}
          name="Registrar"
          onClick={handleRegisterIsOpen}
        />
      </li>
    </>
  );
}
