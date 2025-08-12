declare module 'animejs/lib/anime.es.js' {
  import type { AnimeParams, AnimeTimelineInstance } from 'animejs';
  import animeDefault from 'animejs';
  const anime: typeof animeDefault & {
    timeline: (params?: AnimeParams) => AnimeTimelineInstance;
  };
  export default anime;
}
