import { tv, VariantProps } from "tailwind-variants";

const buttonTV = tv({
  base: "h-12 px-4 py-2 text-sm rounded-full text-white-1 duration-200",
  variants: {
    width: {
      fit: "w-fit",
      full: "w-full",
    },
    variant: {
      primary: "bg-accent-1 hover:bg-accent-2",
      shadow: "bg-black-2 hover:bg-black-3",
    },
  },
});

type ButtonTV = Required<VariantProps<typeof buttonTV>>;

type ButtonProps = ButtonTV &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: string;
    ref?: React.RefObject<HTMLButtonElement>;
  };

export function Button({ children, ref, ...rest }: ButtonProps) {
  return (
    <button
      ref={ref}
      className={buttonTV({ width: rest.width, variant: rest.variant })}
      {...rest}
    >
      {children}
    </button>
  );
}
