import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
export const metadata: Metadata = {
  title: 'AUREL | A new perspective on living',
  description:
    'Scroll through your future home. A fictional residential concept at Moosenberg 12, Switzerland, by Space Code.',
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Link className="skip-link" href="/#residences">
          Skip to residences
        </Link>
        {children}
      </body>
    </html>
  );
}
