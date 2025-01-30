import { auth } from "@/auth";
import { CreateAccountButton } from "./components/CreateAccountButton/CreateAccountButton";
import { CreateCheckoutButton } from "./components/CreateCheckoutButton/CreateCheckoutButton";

export async function Buttons() {
  const session = await auth();

  return (
    <>
      {session && <CreateCheckoutButton />}

      {!session && <CreateAccountButton />}
    </>
  );
}
