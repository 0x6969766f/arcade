import { Game } from '@/utils/notion';
import { useMemo, useState } from 'react';
import { createDropdownOptions, Dropdown, DropdownOption } from './Dropdown';

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
  const platforms = createDropdownOptions(games, 'platform', [
    { label: 'All', value: '*' },
  ]);

  const owners = createDropdownOptions(games, 'owner', [
    { label: 'Any', value: '*' },
  ]);

  const [selectedName, setSelectedName] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [selectedOwner, setSelectedOwner] = useState(owners[0]);

  const searchParams = useMemo(() => {
    return {
      ...(selectedName.length && { name: selectedName }),
      ...(selectedPlatform.value !== '*' && {
        platform: selectedPlatform.value,
      }),
      ...(selectedOwner.value !== '*' && { owner: selectedOwner.value }),
    };
  }, [selectedName, selectedPlatform, selectedOwner]);

  const handleNameChange = (value: string) => {
    setSelectedName(value);
    const { name, ...rest } = searchParams;
    const nextParams = {
      ...rest,
      ...(value.length && { name: value }),
    };
    onSearch(Object.keys(nextParams).length ? nextParams : undefined);
  };

  const handleSelectPlatform = (option: DropdownOption) => {
    setSelectedPlatform(option);
    const { platform, ...rest } = searchParams;
    const nextParams = {
      ...rest,
      ...(option.value !== '*' && { platform: option.value }),
    };
    onSearch(Object.keys(nextParams).length ? nextParams : undefined);
  };

  const handleSelectOwner = (option: DropdownOption) => {
    setSelectedOwner(option);
    const { owner, ...rest } = searchParams;
    const nextParams = {
      ...rest,
      ...(option.value !== '*' && { owner: option.value }),
    };
    onSearch(Object.keys(nextParams).length ? nextParams : undefined);
  };

  return (
    <div className="flex gap-4">
      <div className="relative flex flex-col">
        <label>Name</label>
        <input
          className="border-2 border-purple-950 bg-transparent px-4 py-2 placeholder:text-purple-950/50"
          onChange={(e) => handleNameChange(e.currentTarget.value)}
          placeholder="super mario bros"
          type="text"
          value={selectedName}
        />
        {!!selectedName.length && (
          <div
            className="absolute bottom-3 right-4 cursor-pointer"
            onClick={() => handleNameChange('')}
          >
            x
          </div>
        )}
      </div>
      <div>
        <Dropdown
          id="platform"
          label="Platform"
          options={platforms}
          onChange={handleSelectPlatform}
          selectedOption={selectedPlatform}
        />
      </div>
      <div>
        <Dropdown
          id="owner"
          label="Owner"
          options={owners}
          onChange={handleSelectOwner}
          selectedOption={selectedOwner}
        />
      </div>
    </div>
  );
};
