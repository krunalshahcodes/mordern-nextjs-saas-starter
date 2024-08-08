import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { NextAuthProvider } from "@/components/providers/next-auth-provider";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const fontSans = localFont({
  src: [
    {
      path: "../public/fonts/CustomFont-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CustomFont-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/CustomFont-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/CustomFont-Black.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Indie Pair",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <NextAuthProvider session={session}>
          <ReactQueryProvider>
            <Toaster />
            {children}
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
