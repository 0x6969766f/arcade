import { Game } from '@/utils/notion';

type Props = {
  games: Game[];
};

export const Games = ({ games }: Props) => (
  <table className="mt-4 w-full text-left">
    <thead>
      <tr className="border-b border-dotted border-purple-950">
        <th className="py-2">Name</th>
        <th className="py-2">Platform</th>
        <th className="py-2">Owner</th>
        <th className="py-2">Wishlisted</th>
      </tr>
    </thead>
    <tbody>
      {games.map((game) => (
        <tr key={game.name}>
          <td className="py-2">{game.name}</td>
          <td className="py-2">{game.platform}</td>
          <td className="py-2">{game.owner}</td>
          <td className="py-2">{game.wishlist ? 'Yes' : 'No'}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
