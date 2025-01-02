"use client";

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Sidebar } from '@/components/sidebar';
import { MobileHeader } from '@/components/mobile-header';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth') || pathname?.startsWith('/logout');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            {!isAuthPage && <MobileHeader />}
            <div className="flex flex-1 flex-col md:flex-row">
              {!isAuthPage && <Sidebar />}
              <main className={`flex-1 overflow-y-auto bg-background pb-16 md:pb-0 ${
                isAuthPage ? '' : ''
              }`}>
                <div className={` ${
                  isAuthPage ? '' : 'container mx-auto py-6 px-4 md:px-6'
                }`}>
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}