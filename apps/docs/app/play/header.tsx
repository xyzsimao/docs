import Link from 'next/link';
import Image from 'next/image';
import { ImageZoom } from 'xyzdocs-ui/components/image-zoom';
import logo_test from '@/public/logo_test.svg';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { ButtonGroup } from '@/components/ui/button-group';
import { useContext } from 'react';
import { REPLContext } from './components/repl';
export default function Header() {

    const {
      playground,
      setPlayground,
      maximizeREPL,
      setMaximizeREPL,
    } = useContext(REPLContext)!;
  
  return (
    <div className="p-8 h-14 flex items-center justify-center ">  
      {/* <div className=" flex flex-none">
        <Link href="/">
          <Image width={32} height={32} alt="JSPlayground.dev logo" src={logo_test} priority />
        </Link>
      </div> */}
     
        <div
          className={cn(
            ' py-2 rounded    text-center gap-2 flex justify-between items-center',
          )}
        >
      <ButtonGroup>
        <Button onClick={() => setPlayground('js')} variant="outline">
          Js
        </Button>
        <Button onClick={() => setPlayground('web')} variant="outline">
          Web
        </Button>
      </ButtonGroup>
        </div>
 
    </div>
  );
}
