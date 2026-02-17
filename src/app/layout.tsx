import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/src/components/features/Navbar';

export const metadata: Metadata = {
  title: 'JapanVocab',
  description: 'Your elegant personal dictionary',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
