"use client";

import { twMerge } from "tailwind-merge";

type DialogWrappingProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
  ref?: React.RefObject<HTMLFormElement>;
};

export function DialogWrapping({
  children,
  ref,
  ...rest
}: DialogWrappingProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black-2/10 backdrop-blur-3xl">
      <form
        className="w-full max-w-[31.25rem] space-y-5 rounded-2xl bg-black-1 p-10"
        ref={ref}
        {...rest}
      >
        {children}
      </form>
    </div>
  );
}

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function DialogHeader({ className, children }: DialogHeaderProps) {
  return <div className={twMerge("space-y-1", className)}>{children}</div>;
}

type DialogHeaderTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
};

export function DialogHeaderTitle({
  children,
  className,
  ...rest
}: DialogHeaderTitleProps) {
  return (
    <h2
      className={twMerge("text-center text-2xl font-bold", className)}
      {...rest}
    >
      {children}
    </h2>
  );
}

type DialogHeaderDescProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
};

export function DialogHeaderDesc({
  className,
  children,
}: DialogHeaderDescProps) {
  return (
    <p className={twMerge("text-center text-sm text-white-1/50", className)}>
      {children}
    </p>
  );
}

type DialogBodyProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function DialogBody({ className, children }: DialogBodyProps) {
  return <div className={twMerge("space-y-4", className)}>{children}</div>;
}

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function DialogFooter({ className, children }: DialogFooterProps) {
  return <div className={twMerge("flex gap-4", className)}>{children}</div>;
}
