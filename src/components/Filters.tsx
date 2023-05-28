import { Game } from '@/utils/notion';
import { useState } from 'react';
import { createDropdownOptions, Dropdown } from './Dropdown';

export type SearchParams = {
  name?: string;
  platform?: string;
  owner?: string;
};

type Props = {
  games: Game[];
  onSearch: (params: SearchParams | undefined) => void;
};

export const Filters = ({ games, onSearch }: Props) => {
  const [selectedName, setSelectedName] = useState<string>('');

  const platforms = createDropdownOptions(games, 'platform', [
    { label: 'All', value: '*' },
  ]);
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);

  const owners = createDropdownOptions(games, 'owner', [
    { label: 'Any', value: '*' },
  ]);
  const [selectedOwner, setSelectedOwner] = useState(owners[0]);

  const handleSearch = () => {
    const params = {
      ...(selectedName.length && { name: selectedName }),
      ...(selectedPlatform.value !== '*' && {
        platform: selectedPlatform.value,
      }),
      ...(selectedOwner.value !== '*' && { owner: selectedOwner.value }),
    };
    onSearch(Object.keys(params).length ? params : undefined);
  };

  return (
    <div className="flex gap-4">
      <div>
        <input
          onChange={(e) => setSelectedName(e.target.value)}
          placeholder="super mario bros"
          type="text"
          value={selectedName}
        />
      </div>
      <div>
        <Dropdown
          label="Platform"
          options={platforms}
          onChange={(option) => setSelectedPlatform(option)}
          selectedOption={selectedPlatform}
        />
      </div>
      <div>
        <Dropdown
          label="Owner"
          options={owners}
          onChange={(option) => setSelectedOwner(option)}
          selectedOption={selectedOwner}
        />
      </div>
      <div>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};
