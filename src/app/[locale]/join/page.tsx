import type { Metadata } from 'next';
import { getTranslator, type Locale } from '@/lib/i18n';
import JoinForm from '@/components/JoinForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslator(locale as Locale);
  return { title: t('join.heading'), description: t('join.description') };
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslator(locale as Locale);
  return (
    <section className="mx-auto max-w-xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t('join.heading')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('join.description')}</p>
      </div>
      <JoinForm locale={locale as Locale} />
    </section>
  );
}
