import { Button } from "@/modules/shared/components/Button/Button";
import Image from "next/image";

export function GamePage() {
  return (
    <section className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-[18.75rem,1fr]">
        <div className="space-y-4">
          <Image
            src={
              "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg?t=1720558643"
            }
            alt="Lorem"
            width={300}
            height={140.22}
            priority={true}
            loading="eager"
            className="block w-full rounded-2xl"
          />

          <ul className="space-y-1 rounded-2xl bg-black-2 p-4 text-sm">
            <li>
              <span className="font-bold">Lançamento:</span> 05/12/2019
            </li>
            <li>
              <span className="font-bold">Genero: Ação:</span> Aventura
            </li>
            <li>
              <span className="font-bold">Desenvolvedor:</span> Rockstar Games
            </li>
            <li>
              <span className="font-bold">Destribuidor:</span> Rockstar Games
            </li>
          </ul>
        </div>

        <div className="space-y-1 rounded-2xl bg-black-2 p-4">
          <h1 className="text-2xl font-bold">Red Dead Redemption 2</h1>

          <p className="scroll overflow-y-auto text-sm">
            Arthur Morgan e a gangue Van der Linde são bandidos em fuga. Com
            agentes federais e os melhores caçadores de recompensas no seu
            encalço, a gangue precisa roubar, assaltar e lutar para sobreviver
            no impiedoso coração dos Estados Unidos. Conforme divisões internas
            profundas ameaçam despedaçar a gangue, Arthur deve fazer uma escolha
            entre os seus próprios ideais e a lealdade à gangue que o criou.
          </p>
        </div>
      </div>

      <div className="ml-auto w-fit">
        <Button width="fit" variant="primary">
          Adicionar / Remover
        </Button>
      </div>
    </section>
  );
}
