import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants";

const buttonTV = tv({
  base: "flex h-12 items-center justify-center gap-1 rounded-full px-4 py-2 text-sm text-white-1 duration-200 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    width: {
      fit: "w-fit",
      full: "w-full",
    },
    variant: {
      primary: "bg-accent-1 hover:bg-accent-2",
      ghost: "bg-black-2 hover:bg-black-3",
    },
    space: {
      between: "justify-between",
      center: "justify-center",
    },
  },
});

type ButtonTV = Required<Omit<VariantProps<typeof buttonTV>, "space">> &
  Pick<VariantProps<typeof buttonTV>, "space">;

type ButtonProps = ButtonTV &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: string;
    ref?: React.RefObject<HTMLButtonElement>;

    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
  };

export function Button({
  children,
  ref,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={twMerge(
        buttonTV({
          width: rest.width,
          variant: rest.variant,
          space: rest.space,
        }),
        className,
      )}
      {...rest}
    >
      {LeftIcon && <LeftIcon />}
      {children}
      {RightIcon && <RightIcon />}
    </button>
  );
}
