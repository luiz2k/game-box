import { MenuOptions } from "./components/Menu/components/MenuOptions/MenuOptions";
import { Menu } from "./components/Menu/Menu";
import { Nav } from "./components/Nav/Nav";

export function Header() {
  return (
    <header className="m-auto flex w-full max-w-5xl items-center justify-between rounded-2xl bg-black-2 p-4">
      <Nav />

      <Menu>
        <MenuOptions />
      </Menu>
    </header>
  );
}
