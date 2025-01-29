"use client"; // Error boundaries must be Client Components

import { Button } from "@/modules/shared/components/Button/Button";
import { PageTitle } from "@/modules/shared/components/PageTitle/PageTitle";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <PageTitle title="Erro ao carregar a pagina" desc="Tente novamente" />

      <Button
        type="button"
        variant="primary"
        width="fit"
        onClick={() => reset()}
      >
        Recarregar
      </Button>
    </div>
  );
}
