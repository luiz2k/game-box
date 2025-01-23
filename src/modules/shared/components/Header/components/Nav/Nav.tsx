"use client";

import { NavAnchor } from "@/modules/shared/components/NavAnchor/NavAnchor";
import { useRouter } from "next/navigation";

export function Nav() {
  const router = useRouter();

  return (
    <nav>
      <NavAnchor href="/" onMouseEnter={() => router.prefetch("/")}>
        Início
      </NavAnchor>
      <NavAnchor href="/jogos" onMouseEnter={() => router.prefetch("/jogos")}>
        Jogos
      </NavAnchor>
    </nav>
  );
}
