'use client';
import { useEffect, useState } from 'react';
import { getTranslator, type Locale } from '@/lib/i18n';
import { logger } from '@/lib/logger';
// import { dataURItoByteString } from 'react-pdf/dist/shared/utils.js';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
type PdfModule = typeof import('react-pdf');

const MAX_FETCH_ATTEMPTS = 2;
const RETRY_DELAY_MS = 400;

export default function PdfViewer({ file, locale }: { file: string; locale: Locale }) {
  const t = getTranslator(locale);
  const [pdf, setPdf] = useState<PdfModule | null>(null);
  const [data, setData] = useState<ArrayBuffer | null>(null);
  const [failed, setFailed] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [fitWidth, setFitWidth] = useState(700);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const mod = await import('react-pdf');
        mod.pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
        if (active) setPdf(mod);
      } catch (err) {
        logger.error('viewer.module_load_failed', {
          message: err instanceof Error ? err.message : String(err),
        });
        if (active) setFailed(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // نجلب البايتات بأنفسنا (GET عادي بلا Range) ونتجاوز طبقة الشبكة داخل pdf.js،
  // مع إعادة محاولة واحدة عند أي استجابة 204.
  useEffect(() => {
    let active = true;
    (async () => {
      for (let attempt = 1; attempt <= MAX_FETCH_ATTEMPTS; attempt++) {
        try {
          const res = await fetch(file, { credentials: 'same-origin' });
          if (res.status === 204) {
            logger.warn('viewer.fetch_204', { file, attempt });
            if (attempt < MAX_FETCH_ATTEMPTS) {
              await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
              continue;
            }
            throw new Error('HTTP 204 No Content');
          }
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const buf = await res.arrayBuffer();
          if (active) {
            setData(buf);
            setFailed(false);
          }
          return;
        } catch (err) {
          logger.error('viewer.fetch_failed', {
            file,
            attempt,
            message: err instanceof Error ? err.message : String(err),
          });
          if (active && attempt === MAX_FETCH_ATTEMPTS) setFailed(true);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [file]);

  useEffect(() => {
    function update() {
      setFitWidth(Math.max(280, Math.min(window.innerWidth - 40, 860)));
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!pdf || !data)
    return <p className="text-gray-500 dark:text-gray-400">{t('viewer.loading')}</p>;
  const { Document, Page } = pdf;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((p) => p - 1)}
            className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            {t('viewer.prev')}
          </button>
          <button
            type="button"
            disabled={numPages === null || pageNumber >= numPages}
            onClick={() => setPageNumber((p) => p + 1)}
            className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            {t('viewer.next')}
          </button>
          {numPages !== null && (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('viewer.page', { current: pageNumber, total: numPages })}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={t('viewer.zoomOut')}
            onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
            className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            −
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            aria-label={t('viewer.zoomIn')}
            onClick={() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
            className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            +
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 p-4 dark:border-gray-800">
        {failed ? (
          <p className="text-red-600">{t('viewer.invalid')}</p>
        ) : (
          <Document
            file={data}
            onLoadSuccess={(p) => {
              logger.info('viewer.loaded', { file, numPages: p.numPages });
              setNumPages(p.numPages);
              setPageNumber(1);
              setFailed(false);
            }}
            onLoadError={() => {
              logger.error('viewer.load_failed', { file });
              setFailed(true);
            }}
          >
            <Page pageNumber={pageNumber}  width={fitWidth * zoom} className={"flex overflow-hidden"} />
          </Document>
        )}
      </div>
      <a
        href={file}
        download
        className="inline-block rounded bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700"
      >
        {t('docs.download')}
      </a>
    </div>
  );
}
