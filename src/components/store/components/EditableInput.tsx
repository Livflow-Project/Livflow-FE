import { twMerge } from 'tailwind-merge';

type EditableInputProps = {
  isEditing: boolean;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEditClick: () => void;
  onUpdate: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  icon: string;
  iconAlt: string;
  isRequired?: boolean;
  error?: boolean;
};

const EditableInput = ({
  isEditing,
  value,
  onChange,
  onKeyDown,
  onEditClick,
  onUpdate,
  inputRef,
  icon,
  iconAlt,
  isRequired = false,
  error,
}: EditableInputProps) => {
  return (
    <li className='flex items-center justify-between'>
      <img src={icon} alt={iconAlt} className='w-[25px]' />
      {isEditing ? (
        <input
          ref={inputRef}
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className={twMerge(
            'input_underlined h-full w-[180px] font-semibold text-main',
            error && 'error-input'
          )}
          required={isRequired}
        />
      ) : (
        <span className='w-[180px] truncate text-center font-semibold text-main'>
          {value}
        </span>
      )}
      <button
        type='button'
        className='text_button text-[13px] outline-none hover:font-bold'
        onClick={isEditing ? onUpdate : onEditClick}
      >
        {isEditing ? '완료' : '수정'}
      </button>
    </li>
  );
};

export default EditableInput;
