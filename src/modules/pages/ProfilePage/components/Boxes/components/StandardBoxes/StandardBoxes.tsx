import Link from "next/link";
import {
  BoxCardHeader,
  BoxCardHeaderContent,
  BoxCardTitle,
  BoxCardWrapper,
} from "../../../BoxCard/BoxCard";

export function StandardBoxes() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Caixas padrão</h2>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(12.5rem,_1fr))] gap-4">
        <Link href={`/perfil/caixa/padrao/favorite`}>
          <BoxCardWrapper>
            <BoxCardHeader>
              <BoxCardHeaderContent title={"Favorito"} />
            </BoxCardHeader>

            <BoxCardTitle>Favorito</BoxCardTitle>
          </BoxCardWrapper>
        </Link>
        <Link href={`/perfil/caixa/padrao/playing`}>
          <BoxCardWrapper>
            <BoxCardHeader>
              <BoxCardHeaderContent title="Jogando" />
            </BoxCardHeader>

            <BoxCardTitle>Jogando</BoxCardTitle>
          </BoxCardWrapper>
        </Link>
        <Link href={`/perfil/caixa/padrao/abandoned`}>
          <BoxCardWrapper>
            <BoxCardHeader>
              <BoxCardHeaderContent title="Abandonado" />
            </BoxCardHeader>

            <BoxCardTitle>Abandonado</BoxCardTitle>
          </BoxCardWrapper>
        </Link>
        <Link href={`/perfil/caixa/padrao/finished`}>
          <BoxCardWrapper>
            <BoxCardHeader>
              <BoxCardHeaderContent title="Finalizado" />
            </BoxCardHeader>

            <BoxCardTitle>Finalizado</BoxCardTitle>
          </BoxCardWrapper>
        </Link>
      </div>
    </div>
  );
}
