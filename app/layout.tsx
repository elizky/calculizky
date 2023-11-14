import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://calculizky.vercel.app/'),
  title: {
    default: 'Calculizky',
    template: '%s | Calculizky',
  },
  description:
    'Una aplicación para calcular de manera fácil y justa cómo dividir los gastos entre un grupo de personas',
  applicationName: 'Calculizky',
  authors: [{ name: 'Izky', url: 'https://izky.vercel.app/' }],
  keywords: ['Calculadora de Gastos', 'División de Gastos', 'Calculadora Justa'],
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Calculizky',
    description:
      'Una aplicación para calcular de manera fácil y justa cómo dividir los gastos entre un grupo de personas',
    url: 'https://calculizky.vercel.app/',
    siteName: 'Calculizky',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'public/izky.png',
        width: 800,
        height: 600,
        alt: 'Imagen de izky',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
