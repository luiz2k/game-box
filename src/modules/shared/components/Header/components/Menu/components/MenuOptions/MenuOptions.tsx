import { auth } from "@/auth";
import { OptionsClient } from "./components/OptionsClient/OptionsClient";
import { OptionsServer } from "./components/OptionsServer/OptionsServer";

//
export async function MenuOptions() {
  const session = await auth();

  return (
    <div className="absolute right-0 top-11 z-10 w-32 overflow-hidden rounded-2xl bg-accent-1 py-2">
      {/* Exibe de acordo com o status da sessão do usuário */}
      <ul>
        {!session && <OptionsClient />}

        {session && <OptionsServer />}
      </ul>
    </div>
  );
}
