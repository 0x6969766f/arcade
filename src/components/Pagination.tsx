import { getCurrentRange } from '@/utils/search';
import { clsx } from 'clsx';

type Props = {
  currentPage: number;
  onChangePage: (page: number) => void;
  totalGames: number;
};

export const Pagination = ({
  currentPage,
  onChangePage,
  totalGames,
}: Props) => {
  const range = getCurrentRange(currentPage);
  const noPreviousPage = currentPage === 1;
  const noNextPage = totalGames > range.from && totalGames < range.to;
  return (
    <div className="flex">
      <button
        className={clsx(noPreviousPage && 'opacity-50')}
        disabled={noPreviousPage}
        onClick={() => onChangePage(currentPage - 1)}
      >
        Back
      </button>
      <button
        className={clsx(noNextPage && 'opacity-50')}
        disabled={noNextPage}
        onClick={() => onChangePage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
