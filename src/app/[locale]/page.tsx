import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslator, getDepartments, type Locale, getGoals } from '@/lib/i18n';
import { Star } from 'lucide-react';

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
  params: Promise<{ locale: string}>;
}) {
  const { locale } = await params;
  const t = getTranslator(locale as Locale);
  const departments = getDepartments(locale as Locale);
  const goals = getGoals(locale as Locale)
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">{t('home.title')}</h1>
      <div>
        <div className='flex gap-1'>
        <span className='bg-[#f7bf00] font-bold text-[#1f372c] rounded-sm px-1'>{t('home.descriptionSpan')}</span>
      <p className="text-lg text-gray-600 dark:text-gray-400">{t('home.description')}</p>
        </div>
      <p className="text-lg text-gray-600 dark:text-gray-400">{t('home.descriptionP2')}</p>
      </div>
      <div className='border-t-1 border-[#f7bf00] py-4 flex flex-col md:flex-row'>
    {goals.map((g,i) => <div key={i}>
      <div className='p-2 md:border-x-1 sm:border-y-1 border-[#f7bf00]'>

      <div className='flex gap-1'>
      <Star fill='#f7bf00'/>
      <h2 className='font-bold'>{g.title}</h2>
      </div>
      <p className='text-white'>{g.description}</p>
      </div>
    </div>)}
      </div>
      <div className="border-y border-[#f7bf00] py-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => (
            <div key={d.title} className="rounded-lg border border-emerald-900 bg-[#1f372c] p-3">
              <h2 className="font-semibold text-white">{d.title}</h2>
              <p className="text-sm sm:text-center text-emerald-100/80">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
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
