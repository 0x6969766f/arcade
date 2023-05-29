import { SearchParams } from '@/components/Filters';
import { Game } from './notion';
import { PAGE_SIZE } from './constants';
import { naturalSorter } from './sort';

export const getCurrentRange = (currentPage: number) => {
  return {
    from: (currentPage - 1) * PAGE_SIZE,
    to: PAGE_SIZE * currentPage,
  };
};

export const findGames = (
  games: Game[],
  currentPage: number,
  searchParams: SearchParams | undefined,
) => {
  const range = getCurrentRange(currentPage);

  if (!searchParams) {
    return games.sort(naturalSorter('name')).slice(range.from, range.to);
  }

  const { name, platform, owner } = searchParams;

  let results: Game[] = games;

  if (name) {
    results = games.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (platform) {
    results = results.filter((game) => game.platform === platform);
  }

  if (owner) {
    results = results.filter((game) => game.owner === owner);
  }

  return results.sort(naturalSorter('name')).slice(range.from, range.to);
};
