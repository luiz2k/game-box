import { auth } from "@/auth";
import { findAllCustomBoxByUserId } from "@/modules/shared/lib/prisma/prisma";
import Link from "next/link";
import {
  BoxCardHeader,
  BoxCardHeaderAction,
  BoxCardHeaderContent,
  BoxCardTitle,
  BoxCardWrapper,
} from "../../../BoxCard/BoxCard";
import { CreateBox } from "./components/CreateBox/CreateBox";
import { Trash2 } from "lucide-react";

export async function CustomBoxes() {
  // Obtém o ID do usuário através da sessão
  const session = await auth();
  const userId = session?.user?.id;

  // Busca todas as caixas que o usuário criou
  const customBoxes = await findAllCustomBoxByUserId(Number(userId));

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Suas caixas</h2>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(12.5rem,_1fr))] gap-4">
        {customBoxes.map((box) => (
          <Link key={box.id} href={`/perfil/caixa/customizada/${box.id}`}>
            <BoxCardWrapper>
              <BoxCardHeader>
                <BoxCardHeaderContent title={box.name} />

                <BoxCardHeaderAction>
                  <Trash2 />
                </BoxCardHeaderAction>
              </BoxCardHeader>

              <BoxCardTitle>{box.name}</BoxCardTitle>
            </BoxCardWrapper>
          </Link>
        ))}

        <CreateBox userId={Number(userId)} />
      </div>
    </div>
  );
}
