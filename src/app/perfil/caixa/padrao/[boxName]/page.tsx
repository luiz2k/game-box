import { StandardBoxPage } from "@/modules/pages/StandardBoxPage/StandardBoxPage";
import { standardBoxes } from "@/modules/shared/utils/standardBoxes";
import { Metadata } from "next";

type GenerateMetadataProps = {
  params: Promise<{ boxName: string }>;
};

// Gera a metadata da página de forma dinâmica
export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { boxName } = await params;

  // Encontra informações da caixa padrão pelo valor do parâmetro
  const standardBoxe = standardBoxes.find(
    (box) => box.box === boxName.toUpperCase(),
  );

  // Define o título da página como o nome da caixa padrão
  return {
    title: `${standardBoxe?.name} - GAME BOX`,
  };
}

export default StandardBoxPage;
