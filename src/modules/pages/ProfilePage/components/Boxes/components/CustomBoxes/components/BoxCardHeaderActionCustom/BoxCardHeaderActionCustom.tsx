"use client";

import { BoxCardHeaderAction } from "@/modules/pages/ProfilePage/components/BoxCard/BoxCard";
import { Trash2 } from "lucide-react";
import { useDeleteCustomBoxDialogStore } from "../../../stores/deleteCustomBoxStore";

type BoxCardHeaderActionCustomProps = {
  id: number;
  name: string;
};

export function BoxCardHeaderActionCustom({
  id,
  name,
}: BoxCardHeaderActionCustomProps) {
  const { handleDialogForm, setBox } = useDeleteCustomBoxDialogStore();

  return (
    <BoxCardHeaderAction
      onClick={(event) => {
        event.preventDefault();

        setBox({ id: id, name: name });
        handleDialogForm();
      }}
    >
      <Trash2 />
    </BoxCardHeaderAction>
  );
}
