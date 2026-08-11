import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslator, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslator(locale as Locale);
  return { title: t('home.title'), description: t('home.description') };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslator(locale as Locale);
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">{t('home.title')}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">{t('home.description')}</p>
      <div className="flex gap-3 pt-2">
        <Link
          href={`/${locale}/join`}
          className="rounded bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700"
        >
          {t('home.cta')}
        </Link>
        <Link
          href={`/${locale}/docs`}
          className="rounded border border-gray-300 px-5 py-2.5 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          {t('nav.docs')}
        </Link>
      </div>
    </section>
  );
}
