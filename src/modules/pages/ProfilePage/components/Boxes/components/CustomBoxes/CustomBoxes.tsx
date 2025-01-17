import { Plus } from "lucide-react";
import { BoxCard } from "../../../BoxCard/BoxCard";

export function CustomBoxes() {
  return (
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
  );
}
