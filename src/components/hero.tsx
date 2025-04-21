

'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { getIdFromSlug, getNameFromShow, getSlug } from '@/lib/utils';
import MovieService from '@/services/MovieService';
import { useModalStore } from '@/stores/modal';
import { useSearchStore } from '@/stores/search';
import { MediaType, type Show } from '@/types';
import { type AxiosResponse } from 'axios';
import Link from 'next/link';
import React from 'react';
import CustomImage from './custom-image';
import { usePathname } from 'next/navigation';

interface HeroProps {
  randomShow: Show | null;
}

const Hero = ({ randomShow }: HeroProps) => {
  const path = usePathname();
  const modalStore = useModalStore();
  const searchStore = useSearchStore();

  React.useEffect(() => {
    const handlePopstateEvent = () => {
      const pathname = window.location.pathname;
      if (!/\d/.test(pathname)) {
        modalStore.reset();
      } else if (/\d/.test(pathname)) {
        const movieId: number = getIdFromSlug(pathname);
        if (!movieId) return;

        const findMovie: Promise<AxiosResponse<Show>> = pathname.includes('/tv-shows')
          ? MovieService.findTvSeries(movieId)
          : MovieService.findMovie(movieId);

        findMovie
          .then((response: AxiosResponse<Show>) => {
            useModalStore.setState({ show: response.data, open: true, play: true });
          })
          .catch(console.error);
      }
    };

    window.addEventListener('popstate', handlePopstateEvent);
    return () => window.removeEventListener('popstate', handlePopstateEvent);
  }, [modalStore]);

  const handleHref = (): string => {
    if (!randomShow) return '#';
    if (!path.includes('/anime')) {
      const type = randomShow.media_type === MediaType.MOVIE ? 'movie' : 'tv';
      return `/watch/${type}/${randomShow.id}`;
    }
    const prefix = randomShow?.media_type === MediaType.MOVIE ? 'm' : 't';
    return `/watch/anime/${prefix}-${randomShow.id}`;
  };

  if (searchStore.query.length > 0) return null;

  return (
    <section aria-label="Hero" className="relative w-full overflow-hidden bg-black">
      {randomShow && (
        <div className="relative h-[75vh] min-h-[480px] w-full">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0 h-full w-full">
            <CustomImage
              src={`https://image.tmdb.org/t/p/original${
                randomShow?.backdrop_path ?? randomShow?.poster_path ?? ''
              }`}
              alt={randomShow?.title ?? 'poster'}
              className="z-0 h-full w-full object-cover opacity-60"
              sizes="100vw"
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex h-full items-center px-4 sm:px-8 lg:px-16">
            <div className="max-w-2xl space-y-4 text-white md:space-y-6">
              {/* Title */}
              <h1 className="text-4xl font-extrabold drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
                {randomShow?.title ?? randomShow?.name}
              </h1>

              {/* Metadata */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 rounded-lg bg-green-600/90 px-3 py-1 backdrop-blur-sm">
                  <Icons.instagram className="h-4 w-4 fill-current text-white" />
                  <span className="font-semibold text-white">
                    {Math.round(randomShow.vote_average * 10)}% Match
                  </span>
                </div>
                <p className="text-lg font-medium text-gray-300">
                  {randomShow.release_date?.split('-')[0]}
                </p>
              </div>

              {/* Overview */}
              <p className="line-clamp-3 text-lg font-medium text-gray-300 md:line-clamp-4 md:text-xl">
                {randomShow.overview}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link prefetch={false} href={handleHref()}>
                  <Button
                    aria-label="Play video"
                    className="h-14 gap-3 rounded-xl bg-white text-black px-8 text-lg font-bold transition-all duration-300 hover:scale-105 hover:bg-gray-200"
                  >
                    <Icons.play className="h-6 w-6 fill-current" />
                    Play Now
                  </Button>
                </Link>
                <Button
                  aria-label="Open show's details modal"
                  variant="outline"
                  className="h-14 gap-3 rounded-xl border-2 border-white/20 bg-white/10 px-8 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-lg"
                  onClick={() => {
                    const name = getNameFromShow(randomShow);
                    const path = randomShow.media_type === MediaType.TV ? 'tv-shows' : 'movies';
                    window.history.pushState(null, '', `${path}/${getSlug(randomShow.id, name)}`);
                    useModalStore.setState({
                      show: randomShow,
                      open: true,
                      play: true,
                    });
                  }}
                >
                  <Icons.info className="h-6 w-6" />
                  More Info
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Gradient Scrim */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>
      )}
    </section>
  );
};

export default Hero;
