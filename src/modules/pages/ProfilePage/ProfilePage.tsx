import { auth } from "@/auth";
import { getUserById } from "@/modules/shared/lib/prisma/prisma";
import { Boxes } from "./components/Boxes/Boxes";
import { SignatureInfo } from "./components/SignatureInfo/SignatureInfo";
import { PageTitle } from "@/modules/shared/components/PageTitle/PageTitle";

export async function ProfilePage() {
  const session = await auth();

  const user = await getUserById(Number(session?.user?.id));

  return (
    <section className="space-y-10">
      <PageTitle
        title="Perfil"
        desc={
          <>
            Bem-vindo{" "}
            <span className="font-bold">{session?.user?.username}</span>.
          </>
        }
      />

      {user && <SignatureInfo plan={user.plan} />}

      <Boxes />
    </section>
  );
}
