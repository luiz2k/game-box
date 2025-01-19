import { auth } from "@/auth";
import { findAllCustomBoxByUserId } from "@/modules/shared/lib/prisma/prisma";
import Link from "next/link";
import {
  BoxCardHeader,
  BoxCardHeaderContent,
  BoxCardTitle,
  BoxCardWrapper,
} from "../../../BoxCard/BoxCard";
import { BoxCardHeaderActionCustom } from "./components/BoxCardHeaderActionCustom/BoxCardHeaderActionCustom";
import { CreateBox } from "./components/CreateBox/CreateBox";
import { DeleteBox } from "./components/DeleteBox/DeleteBox";

export async function CustomBoxes() {
  // Obtém o ID do usuário através da sessão
  // Se não encontrar, retorna null
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  // Busca todas as caixas que o usuário criou
  const boxes = await findAllCustomBoxByUserId(Number(userId));

  return (
    <div className="grid gap-5">
      <h2 className="text-2xl font-bold">Suas caixas</h2>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(12.5rem,_1fr))] gap-4">
        {boxes.map((box) => (
          <Link key={box.id} href={`/perfil/caixa/customizada/${box.id}`}>
            <BoxCardWrapper>
              <BoxCardHeader>
                <BoxCardHeaderContent title={box.name} />

                <BoxCardHeaderActionCustom id={box.id} name={box.name} />
              </BoxCardHeader>

              <BoxCardTitle>{box.name}</BoxCardTitle>
            </BoxCardWrapper>
          </Link>
        ))}

        <CreateBox userId={userId} />
      </div>

      <DeleteBox userId={userId} />
    </div>
  );
}
