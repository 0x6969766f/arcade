import { useState } from 'react';

export type DropdownOption = Record<'label' | 'value', string>;

export const createDropdownOptions = <T, K extends keyof T>(
  data: T[],
  key: K,
  options: DropdownOption[] = [],
) => {
  return [
    ...options,
    ...[...new Set(data.map((entry) => entry[key]))].map((console) => ({
      label: console,
      value: console,
    })),
  ];
};

type Props = {
  label: string;
  options: DropdownOption[];
  onChange: (option: DropdownOption) => void;
  selectedOption: DropdownOption;
};

export const Dropdown = ({
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
    <div>
      <button onClick={() => setIsSelectable(!isSelectable)}>
        <span>{label}</span>
        <span>
          <span>{selectedOption.label}</span>
          <span className="ml-auto">{isSelectable ? '▴' : '▾'}</span>
        </span>
      </button>
      {isSelectable && (
        <ul className="absolute mt-1 w-full cursor-pointer border border-purple-950 bg-orange-200">
          {options.map((option) => (
            <li
              className="p-4 hover:bg-yellow-950/10"
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
