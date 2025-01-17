import {
  SidebarHeader,
  SidebarTitle,
  SidebarDesc,
  SidebarBody,
} from "@/modules/shared/components/Sidebar/Sidebar";
import { BoxButtons } from "./components/BoxButtons/BoxButtons";
import { Game } from "@prisma/client";
import { ClientAndServerWrapper } from "./components/ClientAndServerWrapper/ClientAndServerWrapper";

type SidebarProps = {
  game: Game;
};
export function Sidebar({ game }: SidebarProps) {
  return (
    <ClientAndServerWrapper>
      {/* Passa o conteúdo como filho renderizado no lado do servidor */}
      <SidebarHeader>
        <SidebarTitle>{game.title}</SidebarTitle>
        <SidebarDesc>
          Gerenciando as caixas que o jogo{" "}
          <span className="font-bold">{game.title}</span> pertence.
        </SidebarDesc>
      </SidebarHeader>

      <SidebarBody>
        <BoxButtons gameId={game.id} />
      </SidebarBody>
    </ClientAndServerWrapper>
  );
}
