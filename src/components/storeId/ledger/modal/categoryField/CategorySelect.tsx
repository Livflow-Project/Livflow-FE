import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_CATEGORIES_GROUPED,
} from './categories';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Dropdown from './Dropdown';
import OptionList from './OptionList';
import { normalizeText } from '@/utils/normalizeText';
import { showWarnToast } from '@/utils/toast';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { useClickOutside } from '@/hooks/useClickOutside';

type CategorySelectProps = {
  value?: Option;
  onChange: (option: Option) => void;
  hasError?: boolean;
};

type Option = {
  label: string;
  value: string;
};

const CategorySelect = ({ value, onChange, hasError }: CategorySelectProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputLabel, setInputLabel] = useState(value?.label ?? '');
  const [searchTerm, setSearchTerm] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLLIElement>(null);

  useClickOutside(dropdownRef, () => {
    closeDropdown();
  });

  const closeDropdown = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
    setSearchTerm('');
  };

  const handleInputMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    if (isDropdownOpen) {
      e.preventDefault();
      closeDropdown();
    }
  };

  const handleTypedLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputLabel(e.target.value);
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleInputBlur = () => {
    const trimmed = inputLabel.trim();

    if (!trimmed) {
      onChange({ label: '', value: '' });
      setInputLabel('');
      return;
    }

    const normalizedInput = normalizeText(trimmed);
    const matched = TRANSACTION_CATEGORIES.find((cat) =>
      normalizeText(cat.label).startsWith(normalizedInput)
    );

    if (matched) {
      onChange(matched);
      setInputLabel(matched.label);
    } else {
      onChange({ label: '', value: '' });
      setInputLabel('');
      showWarnToast('존재하지 않는 카테고리입니다.');
    }
  };

  const handleOptionSelect = useCallback(
    (option: Option) => {
      onChange(option);
      setInputLabel(option.label);
      setIsDropdownOpen(false);
      setSearchTerm('');

      toast.dismiss();
    },
    [onChange]
  );

  const filteredOptions = useMemo(() => {
    const term = normalizeText(searchTerm);
    if (term === '') return TRANSACTION_CATEGORIES_GROUPED;

    return TRANSACTION_CATEGORIES_GROUPED.map((group) => ({
      ...group,
      items: group.items.filter((option) =>
        normalizeText(option.label).includes(term)
      ),
    })).filter((group) => group.items.length > 0);
  }, [searchTerm]);

  useEffect(() => {
    if (isDropdownOpen && scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({ block: 'center' });
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    if (hasError && inputRef.current) {
      inputRef.current.focus();
      setIsDropdownOpen(true);
      setSearchTerm('');
    }
  }, [hasError]);

  useEffect(() => {
    setInputLabel(value?.label ?? '');
  }, [value]);

  return (
    <div className='relative w-[60%]'>
      <input
        ref={inputRef}
        type='text'
        role='combobox'
        aria-haspopup='listbox'
        aria-expanded={isDropdownOpen}
        aria-controls='category-options'
        aria-autocomplete='list'
        autoComplete='off'
        className={twMerge('input_box w-full', hasError && 'error-input')}
        placeholder='카테고리 입력 또는 선택'
        value={inputLabel}
        onMouseDown={handleInputMouseDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleTypedLabelChange}
      />

      {isDropdownOpen && (
        <Dropdown dropdownRef={dropdownRef}>
          <OptionList
            filteredOptions={filteredOptions}
            value={value}
            onOptionSelect={handleOptionSelect}
            scrollTargetRef={scrollTargetRef}
          />
        </Dropdown>
      )}
    </div>
  );
};

export default CategorySelect;
