import { cn } from "@xyzdocs/ui/cn";
import { ReactNode } from "react";

export function DocsPage({
 
  children,
  className,
}: DocsPageProps){
      let wrapper = (children: ReactNode) => children;
  return wrapper(
        <article className={cn('flex flex-col w-full max-w-225 mx-auto [grid-area:main] px-4 py-6 gap-4 md:px-6 md:pt-8 xl:px-8 xl:pt-14')}>    
       {children}
            </article>    
    )
}