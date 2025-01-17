import Link from "next/link";
import { BoxCard } from "../../../BoxCard/BoxCard";

export function StandardBoxes() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Caixas padrão</h2>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(12.5rem,_1fr))] gap-4">
        <Link href={`/perfil/caixa/padrao/favorite`}>
          <BoxCard title="Favorito" />
        </Link>
        <Link href={`/perfil/caixa/padrao/playing`}>
          <BoxCard title="Jogado" />
        </Link>
        <Link href={`/perfil/caixa/padrao/abandoned`}>
          <BoxCard title="Abandonado" />
        </Link>
        <Link href={`/perfil/caixa/padrao/finished`}>
          <BoxCard title="Finalizado" />
        </Link>
      </div>
    </div>
  );
}
