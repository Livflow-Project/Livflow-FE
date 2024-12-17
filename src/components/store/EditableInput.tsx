import { twMerge } from 'tailwind-merge';

type EditableInputProps = {
  isEditing: boolean;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEditClick: () => void;
  onUpdate: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isDeleteMode: boolean;
  icon: string;
  iconAlt: string;
  isRequired?: boolean;
};

const EditableInput = ({
  isEditing,
  value,
  onChange,
  onKeyDown,
  onEditClick,
  onUpdate,
  inputRef,
  isDeleteMode,
  icon,
  iconAlt,
  isRequired = false,
}: EditableInputProps) => {
  return (
    <>
      <img src={icon} alt={iconAlt} className='w-[30px]' />
      {isEditing ? (
        <input
          ref={inputRef}
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className='h-full w-[200px] border-0 border-b border-gray-300 bg-transparent p-0 pb-1 text-center text-[17px] font-semibold text-main focus:border-b focus:border-gray-300 focus:outline-none focus:ring-0'
          required={isRequired}
        />
      ) : (
        <span className='w-[200px] truncate text-center text-[17px] font-semibold text-main'>
          {value}
        </span>
      )}
      <button
        className={twMerge(
          'text-[13px] outline-none hover:font-bold',
          isDeleteMode ? 'no_hover' : 'soft_TcolorSet'
        )}
        onClick={isEditing ? onUpdate : onEditClick}
        disabled={isDeleteMode}
      >
        {isEditing ? '완료' : '수정'}
      </button>
    </>
  );
};

export default EditableInput;
