'use client';
import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <div dir="rtl" lang="ar" className="space-y-4 py-16 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-gray-600 dark:text-gray-400">
        الصفحة غير موجودة — Page not found
      </p>
      <Link
        href="/ar/"
        className="inline-block rounded bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700"
      >
        العودة إلى الرئيسية
      </Link>
    </div>
  );
}
