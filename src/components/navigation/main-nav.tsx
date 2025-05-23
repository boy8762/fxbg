
'use client';

import React from 'react';
import { type Show, type NavItem } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import {
  cn,
  getSearchValue,
  handleDefaultSearchBtn,
  handleDefaultSearchInp,
} from '@/lib/utils';
import { siteConfig } from '@/configs/site';
import { Icons } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchStore } from '@/stores/search';
import { ModeToggle as ThemeToggle } from '@/components/theme-toggle';
import { DebouncedInput } from '@/components/debounced-input';
import MovieService from '@/services/MovieService';

interface MainNavProps {
  items?: NavItem[];
}

interface SearchResult {
  results: Show[];
}

export function MainNav({ items }: MainNavProps) {
  const path = usePathname();
  const router = useRouter();
  const searchStore = useSearchStore();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('popstate', handlePopstateEvent, false);
    return () => {
      window.removeEventListener('popstate', handlePopstateEvent, false);
    };
  }, []);

  const handlePopstateEvent = () => {
    const pathname = window.location.pathname;
    const search: string = getSearchValue('q');

    if (!search?.length || !pathname.includes('/search')) {
      searchStore.reset();
      searchStore.setOpen(false);
    } else if (search?.length) {
      searchStore.setOpen(true);
      searchStore.setLoading(true);
      searchStore.setQuery(search);
      setTimeout(() => {
        handleDefaultSearchBtn();
      }, 10);
      setTimeout(() => {
        handleDefaultSearchInp();
      }, 20);
      MovieService.searchMovies(search)
        .then((response: SearchResult) => {
          void searchStore.setShows(response.results);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => searchStore.setLoading(false));
    }
  };

  async function searchShowsByQuery(value: string) {
    if (!value?.trim()?.length) {
      if (path === '/search') {
        router.push('/');
      } else {
        window.history.pushState(null, '', path);
      }
      return;
    }

    if (getSearchValue('q')?.trim()?.length) {
      window.history.replaceState(null, '', `search?q=${value}`);
    } else {
      window.history.pushState(null, '', `search?q=${value}`);
    }

    searchStore.setQuery(value);
    searchStore.setLoading(true);
    const shows = await MovieService.searchMovies(value);
    searchStore.setLoading(false);
    void searchStore.setShows(shows.results);

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  React.useEffect(() => {
    const changeBgColor = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };
    window.addEventListener('scroll', changeBgColor);
    return () => window.removeEventListener('scroll', changeBgColor);
  }, [isScrolled]);

  const handleChangeStatusOpen = (value: boolean): void => {
    searchStore.setOpen(value);
    if (!value) searchStore.reset();
  };

  return (
    <nav
      className={cn(
        'relative flex h-14 w-full items-center justify-between px-[4vw] transition-colors duration-300 md:sticky md:h-16 z-50',
        isScrolled ? 'bg-black/90 shadow-md' : 'bg-black'
      )}
    >
      <div className="flex items-center gap-4 md:gap-8">
        <Link
          href="/"
          className="hidden md:block"
          onClick={() => handleChangeStatusOpen(false)}
        >
          <div className="flex items-center space-x-2">
            <Image
              src="/images/flicky.png"
              alt="Site Logo"
              width={150}
              height={150}
              className="h-24 object-contain"
            />
            <span className="sr-only">Home</span>
          </div>
        </Link>

        {items?.length ? (
          <nav className="hidden gap-6 md:flex">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      'relative text-sm font-semibold text-zinc-400 transition-all hover:text-white',
                      path === item.href && 'text-white underline underline-offset-4',
                      item.disabled && 'cursor-not-allowed opacity-60'
                    )}
                    onClick={() => handleChangeStatusOpen(false)}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}

        <div className="block md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 px-0 text-white hover:bg-transparent focus:ring-0"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                  className={`h-6 w-6 transition-transform duration-300 ${
                    searchStore.isOpen ? 'rotate-90' : 'rotate-0'
                  }`}
                >
                  <path
                    d="M5 17H13M5 12H19M5 7H13"
                    stroke="#ffffff"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Image
                  src="/images/flicky.png"
                  alt="Site Logo"
                  width={90}
                  height={70}
                  className="h-20 object-contain"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={20}
              className="w-52 rounded-md bg-zinc-900 text-white shadow-lg"
            >
              <DropdownMenuLabel>
                <Link
                  href="/"
                  className="flex items-center justify-center"
                  onClick={() => handleChangeStatusOpen(false)}
                >
                  <span>{siteConfig.name}</span>
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-700" />
              {items?.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  asChild
                  className="items-center justify-center hover:bg-zinc-800"
                >
                  {item.href && (
                    <Link href={item.href} onClick={() => handleChangeStatusOpen(false)}>
                      <span
                        className={cn(
                          'line-clamp-1 text-zinc-400 hover:text-white',
                          path === item.href && 'font-bold text-white'
                        )}
                      >
                        {item.title}
                      </span>
                    </Link>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DebouncedInput
          id="search-input"
          open={searchStore.isOpen}
          value={searchStore.query}
          onChange={searchShowsByQuery}
          onChangeStatusOpen={handleChangeStatusOpen}
        />
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default MainNav;
