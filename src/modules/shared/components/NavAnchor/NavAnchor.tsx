"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavAnchorProps = {
  href: string;
  children: string;
};

export function NavAnchor({ href, children }: NavAnchorProps) {
  const pathname = usePathname();
  const currentPage = href === pathname;

  return (
    <Link
      href={href}
      data-current-page={currentPage}
      className="hover:bg-accent-2 data-[current-page=true]:bg-accent-1 inline-block rounded-full px-4 py-2 text-sm text-white-1 duration-200"
    >
      {children}
    </Link>
  );
}
