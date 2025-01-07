"use client";

import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

type DialogWrappingProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
  ref?: React.RefObject<HTMLFormElement>;
  close?: () => void;
};

export function DialogWrapping({
  children,
  ref,
  close,
  ...rest
}: DialogWrappingProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black-2/10 backdrop-blur-3xl"
      onClick={close}
    >
      <form
        className="relative grid w-full max-w-[31.25rem] gap-5 rounded-2xl bg-black-1 p-10"
        ref={ref}
        onClick={(event) => event.stopPropagation()}
        {...rest}
      >
        {children}

        {close && (
          <button
            type="button"
            className="absolute right-4 top-4"
            aria-label="Fechar"
            onClick={close}
          >
            <X />
          </button>
        )}
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
