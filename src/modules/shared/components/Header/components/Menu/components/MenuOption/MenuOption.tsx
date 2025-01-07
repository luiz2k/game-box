import { LucideIcon } from "lucide-react";

type MenuOptionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: LucideIcon;
  name: string;
};

export function MenuOption({ icon: Icon, name, ...rest }: MenuOptionProps) {
  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center gap-1 p-2 text-sm duration-200 hover:bg-accent-2"
      {...rest}
    >
      {Icon && <Icon size={16} />} {name}
    </button>
  );
}
