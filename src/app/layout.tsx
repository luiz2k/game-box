import { LoginForm } from "@/modules/shared/components/Forms/LoginForm/LoginForm";
import { RegisterForm } from "@/modules/shared/components/Forms/RegisterForm/RegisterForm";
import { Header } from "@/modules/shared/components/Header/Header";

import { Roboto } from "next/font/google";
import { twMerge } from "tailwind-merge";

import "@shared/styles/globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-black-1">
      <body className={twMerge("mt-4 px-3.5 text-white-1", roboto.className)}>
        <Header />

        <main className="m-auto mb-10 mt-10 grid w-full max-w-5xl gap-10">
          {children}
        </main>

        <RegisterForm />
        <LoginForm />
      </body>
    </html>
  );
}
