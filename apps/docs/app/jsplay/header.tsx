import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
 
import { MdDarkMode, MdLightMode } from 'react-icons/md';

 
 
import { REPLContext } from '@/components/jsplay/components/repl';
import Button from '@/components/jsplay/components/button';

export default function Header() {
 
  const {
    theme,
    setTheme,
    playground,
    setPlayground,
    maximizeREPL,
    setMaximizeREPL,
  } = useContext(REPLContext)!;

  return (
    <header className="px-4 h-14 flex items-center">
      <div className="flex-one flex">
        <Link href="/">
          {/* <Image alt="JSPlayground.dev logo" src={} priority /> */}
        </Link>
      </div>

      <div  >
 
          <div
            className={cn(
              'py-2 rounded bg-[#ffffff] text-[#5f5f5f] text-center flex justify-between items-center',
              'dark:bg-[#161b22] dark:text-[#b5b5b5]',
              { 'animate-pulse child-[*]:invisible': true },
            )}
          >
            <Button
              className={cn('rounded w-14', {
                'text-[#0076cf] dark:text-[#2fafff]': playground === 'js',
                'hover:text-[#0076cf] dark:hover:text-[#2fafff]':
                  playground !== 'js',
              })}
              onClick={() => setPlayground('js')}
            >
              JS
            </Button>

            <span role="presentation">·</span>

            <Button
              className={cn('rounded w-14', {
                'text-[#0076cf] dark:text-[#2fafff]': playground === 'web',
                'hover:text-[#0076cf] dark:hover:text-[#2fafff]':
                  playground !== 'web',
              })}
              onClick={() => setPlayground('web')}
            >
              Web
            </Button>

            {true && (
              <Button
                title={maximizeREPL ? 'Minimize' : 'Maximize'}
 
                className={cn(
                  'ml-1 border-l border-[#cccccc] w-9 text-xl text-[#5f5f5f] hover:text-[#0076cf]',
                  'dark:border-[#30363d] dark:text-white dark:hover:text-[#2fafff]',
                )}
                onClick={() => setMaximizeREPL(!maximizeREPL)}
              />
            )}
          </div>
 
      </div>

      <div className="flex-one flex gap-4 justify-end items-center">
        <div >
          <Button
            as={theme === 'dark' ? MdLightMode : MdDarkMode}
            className={cn(
              'text-xl text-[#5f5f5f] hover:text-[#0076cf]',
              'dark:text-white dark:hover:text-[#2fafff]',
            )}
            onClick={() =>
              setTheme((previousTheme) =>
                previousTheme === 'dark' ? 'light' : 'dark',
              )
            }
          />
        </div>

        <a
          href="https://github.com/tiagovtristao/jsplaygrounddev"
          target="_blank"
          aria-label="GitHub account"
        >
 
        </a>
      </div>
    </header>
  );
}
