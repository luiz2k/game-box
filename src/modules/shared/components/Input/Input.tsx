import { useId } from "react";
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

type FormInputTV = Required<VariantProps<typeof inputTV>>;

type FormInputProps = FormInputTV &
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    ref?: React.RefObject<HTMLInputElement>;
  };

export function FormInput({ label, error, ref, ...rest }: FormInputProps) {
  const id = useId();

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <input
        id={id}
        ref={ref}
        className={inputTV({ width: rest.width })}
        {...rest}
      />
    </div>
  );
}
