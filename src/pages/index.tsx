import { Cutive_Mono } from 'next/font/google';
import { Games } from '@/components/Games';
import { Game, getGames } from '@/utils/notion';
import { Filters, SearchParams } from '@/components/Filters';
import { useMemo, useState } from 'react';
import { Pagination } from '@/components/Pagination';
import { findGames } from '@/utils/search';
import { naturalSorter } from '@/utils/sort';
import Head from 'next/head';

const font = Cutive_Mono({ subsets: ['latin'], weight: '400' });

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
    <>
      <Head>
        <title>Arcade</title>
      </Head>
      <main className={`${font.className} p-8`}>
        <div className="flex justify-between">
          <Filters
            games={data}
            onSearch={(params) => setSearchParams(params)}
          />
          <Pagination
            currentPage={currentPage}
            onChangePage={(page) => setCurrentPage(page)}
            totalGames={!!searchParams ? games.length : data.length}
          />
        </div>
        <Games games={games} isSearched={!!searchParams} />
      </main>
    </>
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
