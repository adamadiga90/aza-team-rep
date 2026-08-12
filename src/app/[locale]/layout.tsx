import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/app/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locales, getTranslator, type Locale } from '@/lib/i18n';
import { SITE_URL } from '@/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const t = getTranslator(locale as Locale);
  return {
    title: { default: t('site.title'), template: `%s | ${t('site.title')}` },
    description: t('site.description'),
    metadataBase: new URL(SITE_URL),
    icons: { icon: '/favicon.svg' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <html lang={locale} dir={dir}>
      <body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-[#041407] dark:text-[#f7bf00]">
        <Header locale={locale as Locale} />
        <main className="mx-auto w-full max-w-4xl px-4 py-12">{children}</main>
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
