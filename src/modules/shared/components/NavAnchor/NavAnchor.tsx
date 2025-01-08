"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tv } from "tailwind-variants";

type NavAnchorProps = {
  href: string;
  children: string;
};

const NavAnchorTv = tv({
  base: "inline-block rounded-full px-4 py-2 text-sm text-white-1 duration-200 hover:bg-accent-2",
  variants: {
    highlight: {
      true: "bg-accent-1",
    },
  },
});

// Verifica se o `href` corresponde ao `pathname`
const handleAnchorHighlight = (pathname: string, href: string) => {
  const hrefFormatted = href.slice(1); // Remove o "/" do `href`
  const pathnameSplited = pathname.split("/"); // Quebra o `pathname` em um array

  const includes = pathnameSplited.includes(hrefFormatted); // Verifica se no array tem o `hrefFormatted`

  // Se o `href` for "/" faz a comparação entre o `pathname` e o `href` normalmente
  // Se não, usa a verificação de `includes`
  const currentPage = href === "/" ? href === pathname : includes;

  return currentPage;
};

export function NavAnchor({ href, children }: NavAnchorProps) {
  const pathname = usePathname();

  const anchorHighlight = handleAnchorHighlight(pathname, href);

  return (
    <Link href={href} className={NavAnchorTv({ highlight: anchorHighlight })}>
      {children}
    </Link>
  );
}
