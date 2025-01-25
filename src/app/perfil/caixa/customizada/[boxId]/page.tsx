import { auth } from "@/auth";
import { CustomBoxPage } from "@/modules/pages/CustomBoxPage/CustomBoxPage";
import { findCustomBoxByUserId } from "@/modules/shared/lib/prisma/customBox";
import { Metadata } from "next";

type GenerateMetadataProps = {
  params: Promise<{ boxId: string }>;
};

// Gera a metadata da página de forma dinâmica
export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { boxId } = await params;

  const session = await auth();

  if (!session) {
    return {
      title: `Caixa customizada - GAME BOX`,
    };
  }

  const box = await findCustomBoxByUserId({
    boxId: +boxId,
    userId: +session.user.id,
  });

  return {
    title: `${box?.name} - GAME BOX`,
  };
}

export default CustomBoxPage;
