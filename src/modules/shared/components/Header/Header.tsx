import { auth } from "@/auth";
import { Menu } from "./components/Menu/Menu";
import { Nav } from "./components/Nav/Nav";

export async function Header() {
  const session = await auth();

  return (
    <header className="m-auto flex w-full max-w-5xl items-center justify-between rounded-2xl bg-black-2 p-4">
      <Nav />

      <Menu session={session} />
    </header>
  );
}
