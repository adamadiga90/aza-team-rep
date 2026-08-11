import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, getTranslator, type Locale } from '@/lib/i18n';
import { docs } from '@/lib/docs';
import PdfViewer from '@/components/PdfViewer';

export function generateStaticParams() {
  return locales.flatMap((locale) => docs.map((doc) => ({ locale, slug: doc.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const doc = docs.find((d) => d.id === slug);
  return { title: doc?.title };
}

export default async function DocDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = getTranslator(locale as Locale);
  const doc = docs.find((d) => d.id === slug);
  if (!doc) notFound();
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{doc.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{doc.description}</p>
      </div>
      <PdfViewer file={doc.pdfPath} locale={locale as Locale} />
      <Link href={`/${locale}/docs`} className="inline-block text-sm underline">
        {t('viewer.back')}
      </Link>
    </section>
  );
}
