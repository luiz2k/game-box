"use client";

import { Button } from "@/modules/shared/components/Button/Button";
import {
  SidebarBody,
  SidebarDesc,
  SidebarFooter,
  SidebarHeader,
  SidebarTitle,
  SidebarWrapping,
} from "@/modules/shared/components/Sidebar/Sidebar";
import { useState } from "react";
import { BoxButtons } from "../BoxButtons/BoxButtons";

type AddToBoxProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  game: any;
};

export function AddToBox({ game }: AddToBoxProps) {
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
          Adicionar na caixa
        </Button>
      </div>

      {isOpen && (
        <>
          <SidebarWrapping close={close}>
            <SidebarHeader>
              <SidebarTitle>{game.title}</SidebarTitle>
              <SidebarDesc>
                Gerenciando as caixas que o jogo{" "}
                <span className="font-bold">{game.title}</span> pertence.
              </SidebarDesc>
            </SidebarHeader>

            <SidebarBody>
              <BoxButtons />
            </SidebarBody>

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
