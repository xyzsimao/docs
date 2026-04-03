import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Body } from './layout.client';
 import { source } from '@/lib/source'
import { NextProvider } from 'xyzdocs-core/framework/next';
import { Provider } from './provider'
import { TreeContextProvider } from 'xyzdocs-ui/contexts/tree';
import { RootProvider } from 'xyzdocs-ui/provider/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full h-full`}
      suppressHydrationWarning
    >
      <Body>
        <RootProvider>
          <TreeContextProvider tree={source.getPageTree()}>
            <Provider>{children}</Provider>
          </TreeContextProvider>
        </RootProvider>
      </Body>
    </html>
  );
}
