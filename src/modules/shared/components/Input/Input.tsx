import { tv, VariantProps } from "tailwind-variants";

const inputTV = tv({
  base: "h-12 px-4 py-2 text-sm rounded-full text-white-1 duration-200 bg-black-2 focus:bg-black-3 placeholder:text-white/50",
  variants: {
    width: {
      fit: "w-fit",
      full: "w-full",
    },
  },
});

type InputTV = Required<VariantProps<typeof inputTV>>;

type InputProps = InputTV &
  React.InputHTMLAttributes<HTMLInputElement> & {
    ref?: React.RefObject<HTMLInputElement>;
  };

export function Input({ ref, ...rest }: InputProps) {
  return (
    <input ref={ref} className={inputTV({ width: rest.width })} {...rest} />
  );
}
