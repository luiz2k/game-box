import { NavAnchor } from "@/modules/shared/components/NavAnchor/NavAnchor";

export function Nav() {
  return (
    <nav>
      <NavAnchor href="/">Início</NavAnchor>
      <NavAnchor href="/jogos">Jogos</NavAnchor>
    </nav>
  );
}
