// 'use client';
// import { Icons } from '@/components/icons';
// import { Button } from '@/components/ui/button';
// import { getIdFromSlug, getNameFromShow, getSlug } from '@/lib/utils';
// import MovieService from '@/services/MovieService';
// import { useModalStore } from '@/stores/modal';
// import { useSearchStore } from '@/stores/search';
// import { MediaType, type Show } from '@/types';
// import { type AxiosResponse } from 'axios';
// import Link from 'next/link';
// import React from 'react';
// import CustomImage from './custom-image';
// import { usePathname } from 'next/navigation';

// interface HeroProps {
//   randomShow: Show | null;
// }

// const Hero = ({ randomShow }: HeroProps) => {
//   const path = usePathname();
//   React.useEffect(() => {
//     window.addEventListener('popstate', handlePopstateEvent, false);
//     return () => {
//       window.removeEventListener('popstate', handlePopstateEvent, false);
//     };
//   }, []);

//   const handlePopstateEvent = () => {
//     const pathname = window.location.pathname;
//     if (!/\d/.test(pathname)) {
//       modalStore.reset();
//     } else if (/\d/.test(pathname)) {
//       const movieId: number = getIdFromSlug(pathname);
//       if (!movieId) {
//         return;
//       }
//       const findMovie: Promise<AxiosResponse<Show>> = pathname.includes(
//         '/tv-shows',
//       )
//         ? MovieService.findTvSeries(movieId)
//         : MovieService.findMovie(movieId);
//       findMovie
//         .then((response: AxiosResponse<Show>) => {
//           const { data } = response;
//           useModalStore.setState({ show: data, open: true, play: true });
//         })
//         .catch((error) => {
//           console.error(`findMovie: `, error);
//         });
//     }
//   };

//   // stores
//   const modalStore = useModalStore();
//   const searchStore = useSearchStore();

//   if (searchStore.query.length > 0) {
//     return null;
//   }

  // const handleHref = (): string => {
  //   if (!randomShow) {
  //     return '#';
  //   }
  //   if (!path.includes('/anime')) {
  //     const type = randomShow.media_type === MediaType.MOVIE ? 'movie' : 'tv';
  //     return `/watch/${type}/${randomShow.id}`;
  //   }
  //   const prefix: string =
  //     randomShow?.media_type === MediaType.MOVIE ? 'm' : 't';
  //   const id = `${prefix}-${randomShow.id}`;
  //   return `/watch/anime/${id}`;
  // };

//   return (
//     <section aria-label="Hero" className="w-full">
//       {randomShow && (
//         <>
//           <div className="absolute inset-0 z-0 h-[100vw] w-full sm:h-[56.25vw]">
//             <CustomImage
//               src={`https://image.tmdb.org/t/p/original${
//                 randomShow?.backdrop_path ?? randomShow?.poster_path ?? ''
//               }`}
//               alt={randomShow?.title ?? 'poster'}
//               className="-z-40 h-auto w-full object-cover"
//               sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw, 33vw"
//               fill
//               priority
//             />
//             <div className="absolute bottom-0 left-0 right-0 top-0">
//               <div className="absolute bottom-[35%] left-[4%] top-0 z-10 flex w-[36%] flex-col justify-end space-y-2">
//                 <h1 className="text-[3vw] font-bold">
//                   {randomShow?.title ?? randomShow?.name}
//                 </h1>
//                 <div className="flex space-x-2 text-[2vw] font-semibold md:text-[1.2vw]">
//                   <p className="text-green-600">
//                     {Math.round(randomShow?.vote_average * 10) ?? '-'}% Match
//                   </p>
//                   {/* <p className="text-gray-300">{randomShow?.release_date ?? "-"}</p> */}
//                   <p>{randomShow?.release_date ?? '-'}</p>
//                 </div>
//                 {/* <p className="line-clamp-4 text-sm text-gray-300 md:text-base"> */}
//                 <p className="hidden text-[1.2vw] sm:line-clamp-3">
//                   {randomShow?.overview ?? '-'}
//                 </p>
//                 <div className="mt-[1.5vw] flex items-center space-x-2">
//                   <Link prefetch={false} href={handleHref()}>
//                     <Button
//                       aria-label="Play video"
//                       className="h-auto flex-shrink-0 gap-2 rounded-xl">
//                       <Icons.play className="fill-current" aria-hidden="true" />
//                       Play
//                     </Button>
//                   </Link>
//                   <Button
//                     aria-label="Open show's details modal"
//                     variant="outline"
//                     className="h-auto flex-shrink-0 gap-2 rounded-xl"
//                     onClick={() => {
//                       const name = getNameFromShow(randomShow);
//                       const path: string =
//                         randomShow.media_type === MediaType.TV
//                           ? 'tv-shows'
//                           : 'movies';
//                       window.history.pushState(
//                         null,
//                         '',
//                         `${path}/${getSlug(randomShow.id, name)}`,
//                       );
//                       useModalStore.setState({
//                         show: randomShow,
//                         open: true,
//                         play: true,
//                       });
//                     }}>
//                     <Icons.info aria-hidden="true" />
//                     More Info
//                   </Button>
//                 </div>
//               </div>
//             </div>{' '}
//             <div className="opacity-71 absolute inset-0 right-[26.09%] z-[8] bg-gradient-to-r from-secondary to-85%"></div>
//             <div className="absolute bottom-[-1px] left-0 right-0 z-[8] h-[14.7vw] bg-gradient-to-b from-background/0 from-30% via-background/30 via-50% to-background to-80%"></div>
//           </div>
//           <div className="relative inset-0 -z-50 mb-5 pb-[60%] sm:pb-[40%]"></div>
//         </>
//       )}
//     </section>
//   );
// };

// export default Hero;

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
    <section aria-label="Hero" className="relative w-full overflow-hidden">
      {randomShow && (
        <div className="relative h-[75vh] min-h-[480px] w-full">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0 h-full w-full">
            <CustomImage
              src={`https://image.tmdb.org/t/p/original${
                randomShow?.backdrop_path ?? randomShow?.poster_path ?? ''
              }`}
              alt={randomShow?.title ?? 'poster'}
              className="z-0 h-full w-full object-cover transition-transform duration-1000 ease-out"
              sizes="100vw"
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/0" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex h-full items-center px-4 sm:px-8 lg:px-16">
            <div className="max-w-2xl space-y-4 text-background-foreground md:space-y-6">
              {/* Title */}
              <h1 className="text-4xl font-extrabold drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
                {randomShow?.title ?? randomShow?.name}
              </h1>

              {/* Metadata */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 rounded-lg bg-green-600/90 px-3 py-1 backdrop-blur-sm">
                  <Icons.instagram className="h-4 w-4 fill-current" />
                  <span className="font-semibold">
                    {Math.round(randomShow.vote_average * 10)}% Match
                  </span>
                </div>
                <p className="text-lg font-medium text-foreground/80">
                  {randomShow.release_date?.split('-')[0]}
                </p>
              </div>

              {/* Overview */}
              <p className="line-clamp-3 text-lg font-medium text-foreground/80 md:line-clamp-4 md:text-xl">
                {randomShow.overview}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link prefetch={false} href={handleHref()}>
                  <Button
                    aria-label="Play video"
                    className="h-14 transform gap-3 rounded-xl bg-primary px-8 text-lg font-bold transition-all duration-300 hover:scale-105 hover:bg-primary/90"
                  >
                    <Icons.play className="h-6 w-6 fill-current" />
                    Play Now
                  </Button>
                </Link>
                <Button
                  aria-label="Open show's details modal"
                  variant="outline"
                  className="h-14 gap-3 rounded-xl border-2 border-foreground/20 bg-background/30 px-8 text-lg font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-background/50 hover:shadow-lg"
                  onClick={() => {
                    const name = getNameFromShow(randomShow);
                    const path = randomShow.media_type === MediaType.TV
                      ? 'tv-shows'
                      : 'movies';
                    window.history.pushState(
                      null,
                      '',
                      `${path}/${getSlug(randomShow.id, name)}`
                    );
                    useModalStore.setState({
                      show: randomShow,
                      open: true,
                      play: true
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
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
      )}
    </section>
  );
};

export default Hero;