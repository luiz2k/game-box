import { Header } from "@/modules/shared/components/Header/Header";
import { Roboto } from "next/font/google";

import "@shared/styles/globals.css";
import { RegisterForm } from "@/modules/shared/components/Forms/RegisterForm/RegisterForm";
import { LoginForm } from "@/modules/shared/components/Forms/LoginForm/LoginForm";

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

        <main className="m-auto mt-10 w-full max-w-5xl">{children}</main>

        <RegisterForm />
        <LoginForm />
      </body>
    </html>
  );
}
