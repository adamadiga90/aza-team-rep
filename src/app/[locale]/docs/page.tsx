import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslator, type Locale } from '@/lib/i18n';
import { docs } from '@/lib/docs';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslator(locale as Locale);
  return { title: t('docs.heading'), description: t('docs.subheading') };
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslator(locale as Locale);
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t('docs.heading')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('docs.subheading')}</p>
      </div>
      {docs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">{t('docs.notFound')}</p>
      ) : (
        <ul className="space-y-4">
          {docs.map((doc) => (
            <li key={doc.id} className="rounded-lg border border-gray-200 p-5 dark:border-gray-800">
              <h2 className="text-lg font-semibold">
                <Link href={`/${locale}/docs/${doc.id}`} className="hover:underline">
                  {doc.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{doc.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={doc.updated}>
                  {new Date(doc.updated).toLocaleDateString(locale === 'ar' ? 'ar' : 'en-GB')}
                </time>
                <div className="flex gap-3">
                  <Link
                    href={`/${locale}/docs/${doc.id}`}
                    className="rounded bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700"
                  >
                    {t('docs.view')}
                  </Link>
                  <a
                    href={doc.pdfPath}
                    download
                    className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    {t('docs.download')}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
