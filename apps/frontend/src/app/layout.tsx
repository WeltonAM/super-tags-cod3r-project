import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MensagemProvider } from "@/data/contexts/MensagemContext";
import { ProvedorAutenticacao } from "@/data/contexts/ContextoAutenticacao";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <MensagemProvider>
            <ProvedorAutenticacao>
              {children}
            </ProvedorAutenticacao>
          </MensagemProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
