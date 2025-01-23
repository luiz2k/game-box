"use client";

import { useAuthFormsStore } from "@/modules/shared/stores/authFormsStore";
import { KeyRound, LogIn, LogOut, UserPen, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MenuOption } from "./components/MenuOption/MenuOption";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { signOutAction } from "./actions/signOutAction";

type MenuProps = {
  session: Session | null;
};

export function Menu({ session }: MenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { handleLoginIsOpen, handleRegisterIsOpen } = useAuthFormsStore();

  const router = useRouter();

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
        <div className="absolute right-0 top-11 z-10 w-32 overflow-hidden rounded-2xl bg-accent-1 py-2">
          {/* Se o usuário não estiver autenticado, exibe os botões dos formulários */}
          <ul>
            {!session && (
              <>
                <li>
                  <MenuOption
                    icon={LogIn}
                    name="Entrar"
                    onClick={handleLoginIsOpen}
                  />
                </li>
                <li>
                  <MenuOption
                    icon={KeyRound}
                    name="Registrar"
                    onClick={handleRegisterIsOpen}
                  />
                </li>
              </>
            )}

            {/* Se o usuário estiver autenticado, exibe os botões de perfil e sair */}
            {session && (
              <>
                <li>
                  <Link href="/perfil">
                    <MenuOption
                      icon={UserPen}
                      name="Perfil"
                      onMouseEnter={() => router.prefetch("/perfil")}
                    />
                  </Link>
                </li>
                <li>
                  <MenuOption
                    icon={LogOut}
                    name="Sair"
                    onClick={signOutAction}
                    onMouseEnter={() => router.prefetch("")}
                  />
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
