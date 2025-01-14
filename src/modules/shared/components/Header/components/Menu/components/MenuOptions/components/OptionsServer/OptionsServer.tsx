import { LogOut, UserPen } from "lucide-react";
import { MenuOption } from "../../../MenuOption/MenuOption";
import { handleSignOut } from "./actions/signOutAction";
import Link from "next/link";

export function OptionsServer() {
  return (
    <>
      <li>
        <Link href="/perfil">
          <MenuOption icon={UserPen} name="Perfil" />
        </Link>
      </li>
      <li>
        <MenuOption icon={LogOut} name="Sair" onClick={handleSignOut} />
      </li>
    </>
  );
}
