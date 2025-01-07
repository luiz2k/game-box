"use client";

import { useFormStore } from "@/modules/shared/stores/formStore";
import { KeyRound, LogIn, LogOut, UserPen, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { MenuOption } from "./components/MenuOption/MenuOption";

export function Menu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Fecha o menu se clicar fora
  useEffect(() => {
    if (!isOpen) return;

    function documentEvent() {
      setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener("click", documentEvent);
    }

    return () => document.removeEventListener("click", documentEvent);
  }, [isOpen]);

  const { handleLoginForm, handleRegisterForm } = useFormStore();

  const session = false;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Lidar com menu"
        className="flex size-9 items-center justify-center rounded-full bg-accent-1 duration-200 hover:bg-accent-2"
      >
        <UserRound className="size-6 text-white-1" />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 top-11 w-32 -translate-x-1/2 overflow-hidden rounded-2xl bg-accent-1 py-2">
          <ul>
            {!session && (
              <>
                <li>
                  <MenuOption
                    icon={LogIn}
                    name="Entrar"
                    onClick={handleLoginForm}
                  />
                </li>
                <li>
                  <MenuOption
                    icon={KeyRound}
                    name="Registrar"
                    onClick={handleRegisterForm}
                  />
                </li>
              </>
            )}

            {session && (
              <>
                <li>
                  <MenuOption icon={UserPen} name="Perfil" />
                </li>
                <li>
                  <MenuOption icon={LogOut} name="Sair" />
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
