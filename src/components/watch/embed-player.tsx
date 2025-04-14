// 'use client';
// import React from 'react';
// import Loading from '../ui/loading';
// import { useRouter } from 'next/navigation';
// import { MediaType, type IEpisode, type ISeason, type Show } from '@/types';
// import MovieService from '@/services/MovieService';
// import { type AxiosResponse } from 'axios';
// import Season from '../season';

// interface EmbedPlayerProps {
//   url: string;
//   movieId?: string;
//   mediaType?: MediaType;
// }

// function EmbedPlayer(props: EmbedPlayerProps) {
//   const router = useRouter();

//   const [seasons, setSeasons] = React.useState<ISeason[] | null>(null);

//   React.useEffect(() => {
//     // if anime type -> handle after fetch season and episode
//     if (props.mediaType === MediaType.ANIME) {
//       return;
//     }
//     if (iframeRef.current) {
//       iframeRef.current.src = props.url;
//     }

//     const { current } = iframeRef;
//     const iframe: HTMLIFrameElement | null = current;
//     iframe?.addEventListener('load', handleIframeLoaded);
//     return () => {
//       iframe?.removeEventListener('load', handleIframeLoaded);
//     };
//   }, []);

//   React.useEffect(() => {
//     if (!props.movieId || props.mediaType !== MediaType.ANIME) {
//       return;
//     }

//     void handleAnime(props.movieId);
//   }, [props.movieId, props.mediaType]);

//   const loadingRef = React.useRef<HTMLDivElement>(null);
//   const iframeRef = React.useRef<HTMLIFrameElement>(null);

//   const handleChangeEpisode = (episode: IEpisode): void => {
//     const { show_id: id, episode_number: eps } = episode;
//     handleSetIframeUrl(`https://vidsrc.cc/v2/embed/anime/tmdb${id}/${eps}/sub`);
//   };

//   const handleAnime = async (movieId: string) => {
//     const id = Number(movieId.replace('t-', ''));
//     const response: AxiosResponse<Show> = await MovieService.findTvSeries(id);
//     const { data } = response;
//     if (!data?.seasons?.length) {
//       return;
//     }
//     const seasons = data.seasons.filter(
//       (season: ISeason) => season.season_number,
//     );
//     const promises = seasons.map(async (season: ISeason) => {
//       return MovieService.getSeasons(id, season.season_number);
//     });

//     const seasonWithEpisodes = await Promise.all(promises);
//     setSeasons(
//       seasonWithEpisodes.map((res: AxiosResponse<ISeason>) => res.data),
//     );
//     handleSetIframeUrl(
//       `https://vidsrc.cc/v2/embed/anime/tmdb${id}/1/sub?autoPlay=false`,
//     );
//   };

//   const handleSetIframeUrl = (url: string): void => {
//     if (!iframeRef.current) {
//       return;
//     }
//     iframeRef.current.src = url;
//     const { current } = iframeRef;
//     const iframe: HTMLIFrameElement | null = current;
//     iframe.addEventListener('load', handleIframeLoaded);
//     if (loadingRef.current) loadingRef.current.style.display = 'flex';
//   };

//   const handleIframeLoaded = () => {
//     if (!iframeRef.current) {
//       return;
//     }
//     const iframe: HTMLIFrameElement = iframeRef.current;
//     if (iframe) {
//       iframe.style.opacity = '1';
//       iframe.removeEventListener('load', handleIframeLoaded);
//       if (loadingRef.current) loadingRef.current.style.display = 'none';
//     }
//   };

//   return (
//     <div
//       style={{
//         width: '100%',
//         height: '100%',
//         position: 'absolute',
//         backgroundColor: '#000',
//       }}>
//       {seasons && (
//         <Season seasons={seasons ?? []} onChangeEpisode={handleChangeEpisode} />
//       )}
//       <div className="header-top absolute left-0 right-0 top-8 z-[2] flex h-fit w-fit items-center justify-between gap-x-5 px-4 md:h-20 md:gap-x-8 md:px-10 lg:h-24">
//         <div className="flex flex-1 items-center gap-x-5 md:gap-x-8">
//           <svg
//             className="h-10 w-10 flex-shrink-0 cursor-pointer transition hover:scale-125"
//             stroke="#fff"
//             fill="#fff"
//             strokeWidth="0"
//             viewBox="0 0 16 16"
//             height="16px"
//             width="16px"
//             xmlns="http://www.w3.org/2000/svg"
//             onClick={() => router.back()}>
//             <path
//               fillRule="evenodd"
//               d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
//           </svg>
//         </div>
//       </div>
//       <div
//         ref={loadingRef}
//         className="absolute z-[1] flex h-full w-full items-center justify-center">
//         <Loading />
//       </div>
//       <iframe
//         width="100%"
//         height="100%"
//         allowFullScreen
//         ref={iframeRef}
//         style={{ opacity: 0 }}
//         referrerPolicy="no-referrer-when-downgrade"
//       />
//     </div>
//   );
// }

// export default EmbedPlayer;


// 'use client';
// import React from 'react';
// import Loading from '../ui/loading';
// import { useRouter } from 'next/navigation';
// import { MediaType, type IEpisode, type ISeason, type Show } from '@/types';
// import MovieService from '@/services/MovieService';
// import { type AxiosResponse } from 'axios';
// import Season from '../season';

// interface EmbedPlayerProps {
//   url: string;
//   movieId?: string;
//   mediaType?: MediaType;
// }

// function EmbedPlayer(props: EmbedPlayerProps) {
//   const router = useRouter();

//   const [seasons, setSeasons] = React.useState<ISeason[] | null>(null);
//   const loadingRef = React.useRef<HTMLDivElement>(null);
//   const iframeRef = React.useRef<HTMLIFrameElement>(null);

//   React.useEffect(() => {
//     if (props.mediaType === MediaType.ANIME) return;

//     if (iframeRef.current) {
//       iframeRef.current.src = props.url;
//     }

//     const iframe = iframeRef.current;
//     iframe?.addEventListener('load', handleIframeLoaded);

//     return () => {
//       iframe?.removeEventListener('load', handleIframeLoaded);
//     };
//   }, []);

//   React.useEffect(() => {
//     if (!props.movieId || props.mediaType !== MediaType.ANIME) return;
//     void handleAnime(props.movieId);
//   }, [props.movieId, props.mediaType]);

//   const handleChangeEpisode = (episode: IEpisode): void => {
//     const { show_id: id, episode_number: eps } = episode;
//     handleSetIframeUrl(`https://vidsrc.cc/v2/embed/anime/tmdb${id}/${eps}/sub`);
//   };

//   const handleAnime = async (movieId: string) => {
//     const id = Number(movieId.replace('t-', ''));
//     const response: AxiosResponse<Show> = await MovieService.findTvSeries(id);
//     const { data } = response;
//     if (!data?.seasons?.length) return;

//     const seasons = data.seasons.filter((season: ISeason) => season.season_number);
//     const promises = seasons.map(season =>
//       MovieService.getSeasons(id, season.season_number),
//     );

//     const seasonWithEpisodes = await Promise.all(promises);
//     setSeasons(seasonWithEpisodes.map((res: AxiosResponse<ISeason>) => res.data));

//     handleSetIframeUrl(`https://vidsrc.cc/v2/embed/anime/tmdb${id}/1/sub?autoPlay=false`);
//   };

//   const handleSetIframeUrl = (url: string): void => {
//     if (!iframeRef.current) return;
//     iframeRef.current.src = url;
//     iframeRef.current.addEventListener('load', handleIframeLoaded);
//     if (loadingRef.current) loadingRef.current.style.display = 'flex';
//   };

//   const handleIframeLoaded = () => {
//     if (!iframeRef.current) return;

//     iframeRef.current.style.opacity = '1';
//     iframeRef.current.removeEventListener('load', handleIframeLoaded);
//     if (loadingRef.current) loadingRef.current.style.display = 'none';
//   };

//   return (
//     <div
//       style={{
//         width: '100%',
//         height: '100%',
//         position: 'absolute',
//         backgroundColor: '#000',
//       }}
//     >
//       {seasons && (
//         <Season seasons={seasons ?? []} onChangeEpisode={handleChangeEpisode} />
//       )}

//       <div className="header-top absolute left-0 right-0 top-8 z-[2] flex h-fit w-fit items-center justify-between gap-x-5 px-4 md:h-20 md:gap-x-8 md:px-10 lg:h-24">
//         <div className="flex flex-1 items-center gap-x-5 md:gap-x-8">
//           <svg
//             className="h-10 w-10 flex-shrink-0 cursor-pointer transition hover:scale-125"
//             stroke="#fff"
//             fill="#fff"
//             strokeWidth="0"
//             viewBox="0 0 16 16"
//             height="16px"
//             width="16px"
//             xmlns="http://www.w3.org/2000/svg"
//             onClick={() => router.back()}
//           >
//             <path
//               fillRule="evenodd"
//               d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
//             />
//           </svg>
//         </div>
//       </div>

//       <div
//         ref={loadingRef}
//         className="absolute z-[1] flex h-full w-full items-center justify-center"
//       >
//         <Loading />
//       </div>

//       <iframe
//         ref={iframeRef}
//         width="100%"
//         height="100%"
//         allowFullScreen
//         style={{ opacity: 0 }}
//         referrerPolicy="no-referrer-when-downgrade"
//       />
//     </div>
//   );
// }

// export default EmbedPlayer;



'use client';
import React from 'react';
import Loading from '../ui/loading';
import { useRouter } from 'next/navigation';
import { MediaType, type IEpisode, type ISeason, type Show } from '@/types';
import MovieService from '@/services/MovieService';
import { type AxiosResponse } from 'axios';
import Season from '../season';

interface EmbedPlayerProps {
  url: string;
  movieId?: string;
  mediaType?: MediaType;
}

const ANIME_SERVERS = [
  'https://anime-server-1.example.com',
  'https://anime-server-2.example.com',
  'https://anime-server-3.example.com',
  'https://anime-server-4.example.com',
  'https://anime-server-5.example.com',
];

function EmbedPlayer(props: EmbedPlayerProps) {
  const router = useRouter();

  const [seasons, setSeasons] = React.useState<ISeason[] | null>(null);
  const [selectedServer, setSelectedServer] = React.useState(ANIME_SERVERS[0]);
  const [currentEpisode, setCurrentEpisode] = React.useState<IEpisode | null>(null);
  const loadingRef = React.useRef<HTMLDivElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (props.mediaType === MediaType.ANIME) return;

    if (iframeRef.current) {
      iframeRef.current.src = props.url;
    }

    const iframe = iframeRef.current;
    iframe?.addEventListener('load', handleIframeLoaded);

    return () => {
      iframe?.removeEventListener('load', handleIframeLoaded);
    };
  }, []);

  React.useEffect(() => {
    if (!props.movieId || props.mediaType !== MediaType.ANIME) return;
    void handleAnime(props.movieId);
  }, [props.movieId, props.mediaType]);

  const handleChangeServer = (server: string) => {
    setSelectedServer(server);

    if (props.movieId && currentEpisode) {
      const id = Number(props.movieId.replace('t-', ''));
      const eps = currentEpisode.episode_number;
      handleSetIframeUrl(`${server}/embed/tmdb${id}/${eps}/sub`);
    }
  };

  const handleChangeEpisode = (episode: IEpisode): void => {
    const { show_id: id, episode_number: eps } = episode;
    setCurrentEpisode(episode);
    handleSetIframeUrl(`${selectedServer}/embed/tmdb${id}/${eps}/sub`);
  };

  const handleAnime = async (movieId: string) => {
    const id = Number(movieId.replace('t-', ''));
    const response: AxiosResponse<Show> = await MovieService.findTvSeries(id);
    const { data } = response;
    if (!data?.seasons?.length) return;

    const seasons = data.seasons.filter((season: ISeason) => season.season_number);
    const promises = seasons.map(season =>
      MovieService.getSeasons(id, season.season_number),
    );

    const seasonWithEpisodes = await Promise.all(promises);
    setSeasons(seasonWithEpisodes.map((res: AxiosResponse<ISeason>) => res.data));

    setCurrentEpisode({ show_id: id, episode_number: 1 } as IEpisode);
    handleSetIframeUrl(`${selectedServer}/embed/tmdb${id}/1/sub?autoPlay=false`);
  };

  const handleSetIframeUrl = (url: string): void => {
    if (!iframeRef.current) return;
    iframeRef.current.src = url;
    iframeRef.current.addEventListener('load', handleIframeLoaded);
    if (loadingRef.current) loadingRef.current.style.display = 'flex';
  };

  const handleIframeLoaded = () => {
    if (!iframeRef.current) return;

    iframeRef.current.style.opacity = '1';
    iframeRef.current.removeEventListener('load', handleIframeLoaded);
    if (loadingRef.current) loadingRef.current.style.display = 'none';
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#000',
      }}
    >
      {/* Server selector (only for anime) */}
      {props.mediaType === MediaType.ANIME && (
        <div className="absolute z-10 top-4 left-4 bg-black bg-opacity-70 p-2 rounded-md text-white">
          <label htmlFor="server-select" className="mr-2 text-sm">Server:</label>
          <select
            id="server-select"
            value={selectedServer}
            onChange={(e) => handleChangeServer(e.target.value)}
            className="bg-gray-800 text-white text-sm p-1 rounded-md"
          >
            {ANIME_SERVERS.map((server, i) => (
              <option key={server} value={server}>
                Anime Server {i + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Season/Episode selector */}
      {seasons && (
        <Season seasons={seasons ?? []} onChangeEpisode={handleChangeEpisode} />
      )}

      {/* Back button */}
      <div className="header-top absolute left-0 right-0 top-8 z-[2] flex h-fit w-fit items-center justify-between gap-x-5 px-4 md:h-20 md:gap-x-8 md:px-10 lg:h-24">
        <div className="flex flex-1 items-center gap-x-5 md:gap-x-8">
          <svg
            className="h-10 w-10 flex-shrink-0 cursor-pointer transition hover:scale-125"
            stroke="#fff"
            fill="#fff"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="16px"
            width="16px"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => router.back()}
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </div>
      </div>

      {/* Loading spinner */}
      <div
        ref={loadingRef}
        className="absolute z-[1] flex h-full w-full items-center justify-center"
      >
        <Loading />
      </div>

      {/* Iframe for video playback */}
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        allowFullScreen
        style={{ opacity: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default EmbedPlayer;
