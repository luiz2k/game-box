import { auth } from "@/auth";
import { getUserById } from "@/modules/shared/lib/prisma/prisma";
import { Boxes } from "./components/Boxes/Boxes";
import { SignatureInfo } from "./components/SignatureInfo/SignatureInfo";

export async function ProfilePage() {
  const session = await auth();

  const user = await getUserById(Number(session?.user?.id));

  return (
    <section className="space-y-10">
      <div className="space-y-1">
        <h1 className="text-center text-4xl font-bold">Perfil</h1>
        <p className="text-center">Informações do seu perfil</p>
      </div>

      {user && <SignatureInfo plan={user.plan} />}

      <Boxes />
    </section>
  );
}
