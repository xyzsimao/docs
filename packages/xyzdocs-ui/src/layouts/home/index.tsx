import { type BaseLayoutProps, type NavOptions } from '@/layouts/shared';
import { ComponentProps } from 'react';
import { Header } from './client';
import { cn } from '@xyzdocs/ui/cn';

export interface HomeLayoutProps extends BaseLayoutProps {
  nav?: Partial<
    NavOptions & {
      /**
       * Open mobile menu when hovering the trigger
       */
      enableHoverToOpen?: boolean;
    }
  >;
}

export function HomeLayout(props: HomeLayoutProps & ComponentProps<'main'>) {
  const { nav = {}, links , ...rest } = props;

  return (
    <main
      id="nd-home-layout"
      {...rest}
      className={cn('flex flex-1 flex-col [--fd-layout-width:1400px]', rest.className)}
    >
      {nav.enabled !== false &&
        (nav.component ?? (
          <Header
            links={links}
            nav={nav}
  
          />
        ))}
      {props.children}
    </main>  
  );
}
