import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CAMEROUN SOIR Hebdo — Au coeur de l'action publique",
    template: "%s | CAMEROUN SOIR Hebdo",
  },
  description:
    "Presse écrite d'analyse bilingue. L'actualité décryptée avec rigueur et exigence. Analyses, enquêtes et éclairages pour comprendre l'action publique au Cameroun.",
  keywords: [
    "Cameroun",
    "actualités",
    "presse",
    "analyse",
    "action publique",
    "news",
    "Cameroon",
  ],
  openGraph: {
    type: "website",
    siteName: "CAMEROUN SOIR Hebdo",
    locale: "fr_CM",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    const { notFound } = await import("next/navigation");
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
