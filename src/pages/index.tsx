import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Games } from '@/components/Games';
import { Game, getGames } from '@/utils/notion';
import { Filters, SearchParams } from '@/components/Filters';
import { useMemo, useState } from 'react';
import { Pagination } from '@/components/Pagination';
import { findGames } from '@/utils/search';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  data: Game[];
};

export default function Home({ data }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState<SearchParams>();

  const games = useMemo(
    () => findGames(data, currentPage, searchParams),
    [data, currentPage, searchParams],
  );

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Filters games={data} onSearch={(params) => setSearchParams(params)} />
      <Games games={games} />
      <Pagination
        currentPage={currentPage}
        onChangePage={(page) => setCurrentPage(page)}
        totalGames={!!searchParams ? games.length : data.length}
      />
    </main>
  );
}

export const getStaticProps = async () => {
  try {
    const data = await getGames();
    return { props: { data }, revalidate: 1 };
  } catch (error) {
    throw error;
  }
};
