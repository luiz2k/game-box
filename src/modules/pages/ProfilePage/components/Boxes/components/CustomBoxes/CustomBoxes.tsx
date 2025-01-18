import { auth } from "@/auth";
import { CreateBox } from "./components/CreateBox/CreateBox";
import { BoxCard } from "../../../BoxCard/BoxCard";
import { findAllCustomBoxByUserId } from "@/modules/shared/lib/prisma/prisma";
import Link from "next/link";

export async function CustomBoxes() {
  // Ontém o ID do usuário através da sessão
  const session = await auth();
  const id = session?.user?.id;

  const customBoxes = await findAllCustomBoxByUserId(Number(id));

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Suas caixas</h2>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(12.5rem,_1fr))] gap-4">
        {customBoxes.map((box) => (
          <Link key={box.id} href={`/perfil/caixa/customizada/${box.id}`}>
            <BoxCard key={box.id} title={box.name} />
          </Link>
        ))}

        <CreateBox userId={Number(id)} />
      </div>
    </div>
  );
}
