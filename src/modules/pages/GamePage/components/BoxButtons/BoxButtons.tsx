import { Button } from "@/modules/shared/components/Button/Button";
import { Minus, Plus } from "lucide-react";

export function BoxButtons() {
  return (
    <>
      <div className="space-y-2">
        <h2 className="font-bold">Caixas padrão</h2>

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
          <li>
            <Button
              type="button"
              variant="ghost"
              width="full"
              rightIcon={Minus}
              space="between"
            >
              Exemplo
            </Button>
          </li>
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
    </>
  );
}
