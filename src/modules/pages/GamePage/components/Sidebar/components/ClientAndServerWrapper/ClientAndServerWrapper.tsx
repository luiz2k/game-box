"use client";

import { Button } from "@/modules/shared/components/Button/Button";
import {
  SidebarFooter,
  SidebarWrapping,
} from "@/modules/shared/components/Sidebar/Sidebar";
import { useState } from "react";

type AddToBoxProps = {
  children: React.ReactNode;
};

// Responsável por abrir e fechar a sidebar
export function ClientAndServerWrapper({ children }: AddToBoxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="ml-auto w-fit">
        <Button
          width="fit"
          variant="primary"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Gerenciar caixa
        </Button>
      </div>

      {isOpen && (
        <>
          <SidebarWrapping close={close}>
            {/* Receber o conteúdo como filho para separar entre renderização de cliente e servidor */}
            {children}

            <SidebarFooter>
              <Button
                type="button"
                variant="ghost"
                width="full"
                onClick={close}
              >
                Fechar
              </Button>
            </SidebarFooter>
          </SidebarWrapping>
        </>
      )}
    </>
  );
}
