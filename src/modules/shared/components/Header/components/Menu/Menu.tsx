"use client";

import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";

type MenuProps = {
  children: React.ReactNode;
};

export function Menu({ children }: MenuProps) {
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

      {/* Receber o menu como filho para separar entre renderização de client e server */}
      {isOpen && <>{children}</>}
    </div>
  );
}
