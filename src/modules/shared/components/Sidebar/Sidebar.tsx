import { X } from "lucide-react";

type SidebarWrappingProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
  ref?: React.RefObject<HTMLFormElement>;
  close: () => void;
};
export function SidebarWrapping({
  ref,
  children,
  close,
  ...rest
}: SidebarWrappingProps) {
  return (
    <div
      className="fixed inset-0 flex justify-end bg-black/10 backdrop-blur-3xl"
      onClick={close}
    >
      <form
        ref={ref}
        onClick={(event) => event.stopPropagation()}
        className="relative flex h-full w-[21.25rem] flex-col gap-5 rounded-l-2xl bg-black-1 p-10"
        {...rest}
      >
        {children}

        <button
          type="button"
          onClick={close}
          aria-label="Fechar sidebar"
          className="absolute right-4 top-4"
        >
          <X />
        </button>
      </form>
    </div>
  );
}

type SidebarHeaderProps = {
  children: React.ReactNode;
};
export function SidebarHeader({ children }: SidebarHeaderProps) {
  return <div className="space-y-1">{children}</div>;
}

type SidebarTitleProps = {
  children: string;
};
export function SidebarTitle({ children }: SidebarTitleProps) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}

type SidebarDescProps = {
  children: React.ReactNode;
};
export function SidebarDesc({ children }: SidebarDescProps) {
  return <p className="text-sm text-white-1/50">{children}</p>;
}

type SidebarBodyProps = {
  children: React.ReactNode;
};
export function SidebarBody({ children }: SidebarBodyProps) {
  return <div className="space-y-5">{children}</div>;
}

type SidebarFooterProps = {
  children: React.ReactNode;
};
export function SidebarFooter({ children }: SidebarFooterProps) {
  return <div className="flex gap-4">{children}</div>;
}
