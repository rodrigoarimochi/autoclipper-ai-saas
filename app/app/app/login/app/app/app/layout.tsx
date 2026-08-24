import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoClipper AI",
  description: "Gere cortes virais automaticamente com IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
