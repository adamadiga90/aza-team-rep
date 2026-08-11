import Link from 'next/link';

export const dynamic = 'force-static';

export default function RootPage() {
  return (
    <main style={{ fontFamily: 'sans-serif', textAlign: 'center', paddingTop: '2rem' }}>
      <h1>فريقنا التطوعي</h1>
      <p>
        <Link href="/ar/">الانتقال إلى الصفحة الرئيسية</Link>
      </p>
      <script
        dangerouslySetInnerHTML={{
          __html: "if (window.location.pathname === '/') { location.replace('/ar/'); }",
        }}
      />
    </main>
  );
}
