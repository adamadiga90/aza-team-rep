'use client';
import { useState } from 'react';
import { getTranslator, type Locale } from '@/lib/i18n';
import { logger } from '@/lib/logger';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function JoinForm({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});

  const inputCls =
    'w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const nextErrors = { name: name.length === 0, email: !emailOk };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.email) {
      logger.warn('join.validation_failed', { name: nextErrors.name, email: nextErrors.email });
      return;
    }
    if (!endpoint) {
      logger.warn('join.form_missing_endpoint');
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        logger.info('join.submit_success');
        form.reset();
      } else {
        logger.warn('join.submit_failed', { status: res.status });
      }
      setStatus(res.ok ? 'success' : 'error');
    } catch (err) {
      logger.error('join.submit_error', { message: err instanceof Error ? err.message : String(err) });
      setStatus('error');
    }
  }

  if (!endpoint) {
    return (
      <p className="rounded border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
        {t('join.notConfigured')}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          {t('join.name')} *
        </label>
        <input id="name" name="name" type="text" required className={inputCls} />
        {errors.name && <p className="mt-1 text-sm text-red-600">{t('join.name.required')}</p>}
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          {t('join.email')} *
        </label>
        <input id="email" name="email" type="email" required className={inputCls} />
        {errors.email && <p className="mt-1 text-sm text-red-600">{t('join.email.invalid')}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium">
          {t('join.phone')}
        </label>
        <input id="phone" name="phone" type="tel" className={inputCls} />
      </div>
      <div>
        <label htmlFor="skills" className="mb-1 block text-sm font-medium">
          {t('join.skills')}
        </label>
        <textarea id="skills" name="skills" rows={3} className={inputCls} />
      </div>
      <div>
        <label htmlFor="motivation" className="mb-1 block text-sm font-medium">
          {t('join.motivation')}
        </label>
        <textarea id="motivation" name="motivation" rows={3} className={inputCls} />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {status === 'sending' ? t('join.sending') : t('join.submit')}
      </button>
      {status === 'success' && (
        <p
          role="status"
          className="rounded border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
        >
          {t('join.success')}
        </p>
      )}
      {status === 'error' && (
        <p
          role="status"
          className="rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
        >
          {t('join.error')}
        </p>
      )}
    </form>
  );
}
