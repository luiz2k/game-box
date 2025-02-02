"use client";

import { NavAnchor } from "@/modules/shared/components/NavAnchor/NavAnchor";
import { useRouter } from "next/navigation";

export function Nav() {
  const router = useRouter();

  return (
    <nav>
      <ul className="flex">
        <li>
          <NavAnchor href="/" onMouseEnter={() => router.prefetch("/")}>
            Início
          </NavAnchor>
        </li>
        <li>
          <NavAnchor
            href="/jogos"
            onMouseEnter={() => router.prefetch("/jogos")}
          >
            Jogos
          </NavAnchor>
        </li>
      </ul>
    </nav>
  );
}
