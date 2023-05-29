import { getOwnerName, getPlatformName } from '@/utils/games';
import { Game } from '@/utils/notion';

type Props = {
  games: Game[];
  isSearched: boolean;
};

export const Games = ({ games, isSearched }: Props) => (
  <table className="mt-4 w-full text-left">
    <thead>
      <tr className="border-b border-purple-950">
        <th className="py-2" style={{ width: '55%' }}>
          Name
        </th>
        <th className="py-2" style={{ width: '15%' }}>
          Platform
        </th>
        <th className="py-2" style={{ width: '15%' }}>
          Owner
        </th>
        <th className="py-2" style={{ width: '15%' }}>
          Wishlist
        </th>
      </tr>
    </thead>
    <tbody>
      {isSearched && !games.length ? (
        <tr>
          <td className="py-14 text-center" colSpan={4}>
            No game matches the search criteria :(
          </td>
        </tr>
      ) : (
        games.map((game) => (
          <tr key={game.name}>
            <td className="py-2">
              <span>{game.name}</span>
            </td>
            <td className="py-2">{getPlatformName(game.platform)}</td>
            <td className="py-2">{getOwnerName(game.owner)}</td>
            <td className="py-2">{game.wishlist ? 'Yes' : 'No'}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);
