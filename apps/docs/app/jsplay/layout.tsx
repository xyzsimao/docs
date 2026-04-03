import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { ReactNode } from 'react';
 


export default function Layout({ children }: { children: ReactNode }) {
 
  return (
          <div className="h-full  text-sm">
  
                { children }
        </div>
  );
 
}