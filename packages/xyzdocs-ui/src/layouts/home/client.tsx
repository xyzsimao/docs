'use client';
import { type ComponentProps, Fragment, useState } from 'react';
import { cva } from 'class-variance-authority';
import Link from 'xyzdocs-core/link';
import { cn } from '@xyzdocs/ui/cn';
import { type LinkItemType, type NavOptions, renderTitleNav, useLinkItems } from '@/layouts/shared';
import { LinkItem } from '@xyzdocs/ui/link-item';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { buttonVariants } from '@/components/ui/button';
import type { HomeLayoutProps } from '.';
 
import { ChevronDown, Languages } from 'lucide-react';
import { useIsScrollTop } from '@xyzdocs/ui/hooks/use-is-scroll-top';


export const navItemVariants = cva('[&_svg]:size-4', {
  variants: {
    variant: {
      main: 'inline-flex items-center gap-1 p-2 text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[active=true]:text-fd-primary',
      button: buttonVariants({
        color: 'secondary',
        className: 'gap-1.5',
      }),
      icon: buttonVariants({
        color: 'ghost',
        size: 'icon',
      }),
    },
  },
  defaultVariants: {
    variant: 'main',
  },
});

export function Header({
  nav = {},
 
  links,
 
}: HomeLayoutProps) {
  const { navItems, menuItems } = useLinkItems({ links });

  return (
    <HeaderNavigationMenu transparentMode={nav.transparentMode}>
      {renderTitleNav(nav, {
        className: 'inline-flex items-center gap-2.5 font-semibold',
      })}
      {nav.children}
      <ul className="flex flex-row items-center gap-2 px-6 max-sm:hidden">
        {navItems
          .filter((item) => !isSecondary(item))
          .map((item, i) => (
            <NavigationMenuLinkItem key={i} item={item} className="text-sm" />
          ))}
      </ul>
 
    </HeaderNavigationMenu>
  );
}


function isSecondary(item: LinkItemType): boolean {
  if ('secondary' in item && item.secondary != null) return item.secondary;

  return item.type === 'icon';
}

function HeaderNavigationMenu({
  transparentMode = 'none',
  ...props
}: ComponentProps<'div'> & {
  transparentMode?: NavOptions['transparentMode'];
}) {
  const [value, setValue] = useState('');
  const isTop = useIsScrollTop({ enabled: transparentMode === 'top' }) ?? true;
  const isTransparent = transparentMode === 'top' ? isTop : transparentMode === 'always';

  return (
    <NavigationMenu value={value} onValueChange={setValue} asChild>
      <header id="nd-nav" {...props} className={cn('sticky h-14 top-0 z-40', props.className)}>
        <div
          className={cn(
            'backdrop-blur-lg border-b transition-colors *:mx-auto *:max-w-(--fd-layout-width)',
            value.length > 0 && 'max-lg:shadow-lg max-lg:rounded-b-2xl',
            (!isTransparent || value.length > 0) && 'bg-fd-background/80',
          )}
        >
          <NavigationMenuList className="flex h-14 w-full items-center px-4" asChild>
            <nav>{props.children}</nav>
          </NavigationMenuList>

          <NavigationMenuViewport />
        </div>
      </header>
    </NavigationMenu>
  );
}

function NavigationMenuLinkItem({ item, ...props }: { item: LinkItemType; className?: string }) {
  if (item.type === 'custom') return <div {...props}>{item.children}</div>;

  if (item.type === 'menu') {
    const children = item.items.map((child, j) => {
      if (child.type === 'custom') {
        return <Fragment key={j}>{child.children}</Fragment>;
      }

      const {
        banner = child.icon ? (
          <div className="w-fit rounded-md border bg-fd-muted p-1 [&_svg]:size-4">{child.icon}</div>
        ) : null,
        ...rest
      } = child.menu ?? {};

      return (
        <NavigationMenuLink key={`${j}-${child.url}`} asChild>
          <Link
            href={child.url}
            external={child.external}
            {...rest}
            className={cn(
              'flex flex-col gap-2 rounded-lg border bg-fd-card p-3 transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground',
              rest.className,
            )}
          >
            {rest.children ?? (
              <>
                {banner}
                <p className="text-base font-medium">{child.text}</p>
                <p className="text-sm text-fd-muted-foreground empty:hidden">{child.description}</p>
              </>
            )}
          </Link>
        </NavigationMenuLink>
      );
    });

    return (
      <NavigationMenuItem {...props}>
        <NavigationMenuTrigger className={cn(navItemVariants(), 'rounded-md')}>
          {item.url ? (
            <Link href={item.url} external={item.external}>
              {item.text}
            </Link>
          ) : (
            item.text
          )}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3">
          {children}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem {...props}>
      <NavigationMenuLink asChild>
        <LinkItem
          item={item}
          aria-label={item.type === 'icon' ? item.label : undefined}
          className={cn(navItemVariants({ variant: item.type }))}
        >
          {item.type === 'icon' ? item.icon : item.text}
        </LinkItem>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
