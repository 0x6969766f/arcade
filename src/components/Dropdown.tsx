import { Owner, Platform, getOwnerName, getPlatformName } from '@/utils/games';
import { useState } from 'react';

export type DropdownOption = Record<'label' | 'value', string>;

export const createDropdownOptions = <T, K extends keyof T>(
  data: T[],
  key: K,
  options: DropdownOption[] = [],
) => {
  return [
    ...options,
    ...[...new Set(data.map((entry) => entry[key]))].map((entry) => {
      return {
        label:
          key === 'platform'
            ? getPlatformName(entry as Platform)
            : key === 'owner'
            ? getOwnerName(entry as Owner)
            : entry,
        value: entry,
      };
    }),
  ];
};

type Props = {
  id: string;
  label: string;
  options: DropdownOption[];
  onChange: (option: DropdownOption) => void;
  selectedOption: DropdownOption;
};

export const Dropdown = ({
  id,
  label,
  options,
  onChange,
  selectedOption,
}: Props) => {
  const [isSelectable, setIsSelectable] = useState(false);

  const handleSelect = (option: DropdownOption) => {
    onChange(option);
    setIsSelectable(false);
  };

  return (
    <div className="relative">
      <button
        className="flex flex-col"
        onClick={() => setIsSelectable(!isSelectable)}
      >
        <span>{label}</span>
        <span className="flex w-32 justify-between border-2 border-purple-950 px-4 py-2 text-left">
          <span>{selectedOption.label}</span>
          <span>{isSelectable ? '▴' : '▾'}</span>
        </span>
      </button>
      {isSelectable && (
        <ul className="absolute mt-1 w-full cursor-pointer border-2 border-purple-950 bg-orange-200">
          {options.map((option) => (
            <li
              className="p-4 hover:bg-purple-950 hover:text-orange-200"
              key={option.value}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
