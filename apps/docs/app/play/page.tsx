'use client';
 
import { cn } from '@/lib/cn';
import useTheme from '@/lib/hooks/useTheme';
import Head from 'next/head';
import { useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import Header from './header';
import REPL, { REPLContext } from './components/repl';

export default function Page() {
 

  const [playground, setPlayground] = useLocalStorageState<REPLContext['playground']>('playground', {
    defaultValue: 'js',
  });
  const [maximizeREPL, setMaximizeREPL] = useLocalStorageState('maximized', {
    defaultValue: false,
  });
  const [autoRun, setAutoRun] = useLocalStorageState('autorun', {
    defaultValue: true,
  });

  const [replContainer, setREPLContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div
      className={cn(
        'min-h-screen min-w-screen bg-[linear-gradient(to_top,#ffffff_0%,#dfe9f3_100%)] flex flex-col',
        'dark:bg-[linear-gradient(to_top,#0077c0_0%,#000000_100%)]',
      )}
    >      <REPLContext.Provider
            value={{
              playground,
              setPlayground,
              maximizeREPL,
              setMaximizeREPL,
              autoRun,
              setAutoRun,
            }}
          >
      <Header />
          <div
            ref={(ref) => setREPLContainer(ref)}
            className="relative flex flex-col justify-center items-center size-full"
          >
            <REPL  />
          </div>
      </REPLContext.Provider>
    </div>
  );
}
