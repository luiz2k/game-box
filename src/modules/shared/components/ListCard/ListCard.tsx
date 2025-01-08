import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

type ListCardProps = {
  title: string;
  icon?: LucideIcon;
  className?: string;
};

export function ListCard({ title, icon: Icon, className }: ListCardProps) {
  return (
    <div className="group space-y-2 text-white-1">
      <div
        className={twMerge(
          "flex h-[18.75rem] items-center justify-center rounded-2xl bg-black-2 text-6xl duration-200 group-[&:hover]:bg-black-3",
          className,
        )}
      >
        {Icon ? (
          <Icon className="size-[60px]" />
        ) : (
          <>{title[0].toUpperCase()}</>
        )}
      </div>

      <h2 className="text-center text-sm">{title}</h2>
    </div>
  );
}
