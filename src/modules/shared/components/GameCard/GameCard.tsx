import Image from "next/image";

type GameCardWarappingProps = {
  children: React.ReactNode;
};
export function GameCardWarapping({ children }: GameCardWarappingProps) {
  return (
    <div className="rounded-2xl bg-black-2 duration-200 hover:bg-black-3">
      {children}
    </div>
  );
}

type GameCardImageProps = {
  imgSrc: string;
  alt: string;
  id: number;
};
export function GameCardImage({ imgSrc, alt, id }: GameCardImageProps) {
  return (
    <Image
      src={imgSrc}
      width={330.67}
      height={154.55}
      alt={alt}
      quality={100}
      priority={id === 1}
      className="w-full overflow-hidden rounded-2xl"
    />
  );
}

type GameCardBodyProps = {
  children: React.ReactNode;
};
export function GameCardBody({ children }: GameCardBodyProps) {
  return <div className="grid grid-cols-[1fr,auto] gap-4 p-4">{children}</div>;
}

type GameCardBodyHeaderProps = {
  children: React.ReactNode;
};
export function GameCardBodyHeader({ children }: GameCardBodyHeaderProps) {
  return <div className="space-y-4">{children}</div>;
}

type GameCardBodyHeaderTitleProps = {
  title: string;
};
export function GameCardBodyHeaderTitle({
  title,
}: GameCardBodyHeaderTitleProps) {
  return <h2 className="line-clamp-1 font-bold">{title}</h2>;
}

type GameCardBodyHeaderDescProps = {
  children: React.ReactNode;
};
export function GameCardBodyHeaderDesc({
  children,
}: GameCardBodyHeaderDescProps) {
  return <div className="space-y-1 text-sm">{children}</div>;
}

type GameCardBodyActionProps = {
  children: React.ReactNode;
};
export function GameCardBodyAction({ children }: GameCardBodyActionProps) {
  return <div className="flex items-end">{children}</div>;
}

type GameCardBodyActionButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  };
export function GameCardBodyActionButton({
  children,
  ...rest
}: GameCardBodyActionButtonProps) {
  return (
    <button
      className="flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-accent-1 duration-200 hover:bg-accent-2"
      {...rest}
    >
      {children}
    </button>
  );
}
