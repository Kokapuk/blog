import Header from '@/components/Header';
import { Metadata } from 'next';
import '../styles/globals.scss';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Show yourself',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
