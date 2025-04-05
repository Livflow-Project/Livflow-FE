import { TRANSACTION_CATEGORIES_GROUPED } from './categories';
import { twMerge } from 'tailwind-merge';

type Option = {
  label: string;
  value: string;
};

type OptionListProps = {
  filteredOptions: typeof TRANSACTION_CATEGORIES_GROUPED;
  value?: Option;
  onOptionSelect: (option: Option) => void;
  scrollTargetRef?: React.RefObject<HTMLLIElement | null> | null;
};

const OptionList = ({
  filteredOptions,
  value,
  onOptionSelect,
  scrollTargetRef,
}: OptionListProps) => {
  if (filteredOptions.length === 0)
    return <li className='py-2 text-gray-500'>검색 결과 없음</li>;

  return (
    <>
      {filteredOptions.map((group, index) => (
        <div key={group.group}>
          <div
            className={twMerge(
              'bg-blue-50 py-2 text-sm font-bold text-caption',
              index === 0
                ? 'border-b border-underline/20'
                : 'border-y border-underline/20'
            )}
          >
            {group.group}
          </div>
          <ul>
            {group.items.map((option) => (
              <li
                key={option.value}
                role='option'
                ref={value?.value === option.value ? scrollTargetRef : null}
                className={twMerge(
                  'cursor-pointer py-2 text-lg text-main hover:bg-gray-300',
                  value?.value === option.value && 'bg-gray-300'
                )}
                onClick={() => onOptionSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default OptionList;
