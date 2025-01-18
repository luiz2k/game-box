import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

type BoxCardWrapperProps = {
  children: React.ReactNode;
};
export function BoxCardWrapper({ children }: BoxCardWrapperProps) {
  return <div className="group space-y-2 text-white-1">{children}</div>;
}

type BoxCardHeaderProps = {
  children: React.ReactNode;
  className?: string;
};
export function BoxCardHeader({ children, className }: BoxCardHeaderProps) {
  return (
    <div
      className={twMerge(
        "relative flex h-[18.75rem] items-center justify-center rounded-2xl bg-black-2 text-6xl duration-200 group-[&:hover]:bg-black-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

type BoxCardHeaderContentProps = {
  title?: string;
  icon?: LucideIcon;
};

export function BoxCardHeaderContent({
  title,
  icon: Icon,
}: BoxCardHeaderContentProps) {
  return (
    <>
      {Icon && <Icon className="size-[3.75rem]" />}

      {title && <>{title[0].toUpperCase()}</>}
    </>
  );
}

type BoxCardHeaderActionProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  };
export function BoxCardHeaderAction({
  children,
  className,
  ...rest
}: BoxCardHeaderActionProps) {
  return (
    <button
      className={twMerge(
        "absolute bottom-4 right-4 flex size-9 items-center justify-center rounded-full bg-accent-1 text-base duration-200 hover:bg-accent-2",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

type BoxCardTitleProps = {
  children: string;
};
export function BoxCardTitle({ children }: BoxCardTitleProps) {
  return <h2 className="text-center text-sm">{children}</h2>;
}
