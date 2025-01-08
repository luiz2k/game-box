import { BoxCard } from "@/modules/pages/ProfilePage/components/BoxCard/BoxCard";
import { Plus } from "lucide-react";

export function Boxes() {
  return (
    <>
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Caixas padrão</h2>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(12.5rem,_1fr))] gap-4">
          <BoxCard title="Favorito" />
          <BoxCard title="Jogado" />
          <BoxCard title="Abandonado" />
          <BoxCard title="Finalizado" />
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Suas caixas</h2>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(12.5rem,_1fr))] gap-4">
          <BoxCard
            title="Criar nova caixa"
            icon={Plus}
            className="bg-accent-1 group-[&:hover]:bg-accent-2"
          />
        </div>
      </div>
    </>
  );
}
