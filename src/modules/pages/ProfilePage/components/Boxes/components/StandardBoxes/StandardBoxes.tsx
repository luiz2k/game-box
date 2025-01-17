import { BoxCard } from "../../../BoxCard/BoxCard";

export function StandardBoxes() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Caixas padrão</h2>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(12.5rem,_1fr))] gap-4">
        <BoxCard title="Favorito" />
        <BoxCard title="Jogado" />
        <BoxCard title="Abandonado" />
        <BoxCard title="Finalizado" />
      </div>
    </div>
  );
}
