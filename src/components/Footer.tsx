import { getTranslator, type Locale } from '@/lib/i18n';

export default function Footer({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-6 text-sm text-gray-500 dark:text-gray-400">
        <p>{t('footer.note')}</p>
        <p>{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
