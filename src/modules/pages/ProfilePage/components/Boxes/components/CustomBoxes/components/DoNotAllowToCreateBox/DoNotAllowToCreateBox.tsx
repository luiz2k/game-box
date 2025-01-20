import {
  BoxCardWrapper,
  BoxCardHeader,
  BoxCardHeaderContent,
  BoxCardTitle,
} from "@/modules/pages/ProfilePage/components/BoxCard/BoxCard";
import { Plus } from "lucide-react";

export function DoNotAllowToCreateBox() {
  return (
    <button className="cursor-not-allowed">
      <BoxCardWrapper>
        <BoxCardHeader className="bg-accent-1/50 group-[&:hover]:bg-accent-1/50">
          <BoxCardHeaderContent icon={Plus} />
        </BoxCardHeader>

        <BoxCardTitle>Criar nova caixa</BoxCardTitle>
      </BoxCardWrapper>
    </button>
  );
}
