import { Button } from "@/modules/shared/components/Button/Button";
import { PageTitle } from "@/modules/shared/components/PageTitle/PageTitle";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-5 text-center">
      <PageTitle
        title="Página não encontrada"
        desc="A página que você procurava nao foi encontrada"
      />

      <Link href="/">
        <Button variant="primary" width="fit">
          Ir para o Início
        </Button>
      </Link>
    </section>
  );
}
