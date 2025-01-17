import { Button } from "@/modules/shared/components/Button/Button";
import { Game } from "@prisma/client";
import { Plus } from "lucide-react";

type CustomBoxButtonsProps = {
  gameId: number;
};

export function CustomBoxButtons({ gameId }: CustomBoxButtonsProps) {
  return (
    <div className="space-y-2">
      <h2 className="font-bold">Suas caixas</h2>

      <ul className="scroll max-h-40 space-y-2 overflow-y-auto pr-2">
        <li>
          <Button
            type="button"
            variant="primary"
            width="full"
            rightIcon={Plus}
            space="between"
          >
            Exemplo
          </Button>
        </li>
      </ul>
    </div>
  );
}
