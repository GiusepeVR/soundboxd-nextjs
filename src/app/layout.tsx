// app/layout.tsx
import { Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { UserProvider } from '@/components/context/UserContext';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={outfit.variable}>
      <body className={outfit.className}>
        <div className='min-h-screen flex flex-col'>
          <UserProvider>
            <Navbar />
            <main className='flex-1'>{children}</main>
            <Footer />
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
