import Link from "next/link";
import {
  BoxCardHeader,
  BoxCardHeaderContent,
  BoxCardTitle,
  BoxCardWrapper,
} from "../../../BoxCard/BoxCard";
import { standardBoxes } from "@/modules/shared/utils/standardBoxes";

export function StandardBoxes() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Caixas padrão</h2>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(12.5rem,_1fr))] gap-4">
        {standardBoxes.map((box) => (
          <Link
            key={box.box}
            href={`/perfil/caixa/padrao/${box.box.toLowerCase()}`}
          >
            <BoxCardWrapper>
              <BoxCardHeader>
                <BoxCardHeaderContent title={box.name} />
              </BoxCardHeader>

              <BoxCardTitle>{box.name}</BoxCardTitle>
            </BoxCardWrapper>
          </Link>
        ))}
      </div>
    </div>
  );
}
