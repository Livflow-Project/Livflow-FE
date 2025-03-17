type EditableInputProps = {
  isEditing: boolean;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEditClick: () => void;
  onUpdate: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
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
  icon,
  iconAlt,
  isRequired = false,
}: EditableInputProps) => {
  return (
    <li className='flex items-center justify-between'>
      <img src={icon} alt={iconAlt} className='w-[30px]' />
      {isEditing ? (
        <input
          ref={inputRef}
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className='input_underlined h-full w-[200px] font-semibold text-main'
          required={isRequired}
        />
      ) : (
        <span className='w-[200px] truncate text-center text-lg font-semibold text-main'>
          {value}
        </span>
      )}
      <button
        type='button'
        className='soft_TcolorSet text-[13px] outline-none hover:font-bold'
        onClick={isEditing ? onUpdate : onEditClick}
      >
        {isEditing ? '완료' : '수정'}
      </button>
    </li>
  );
};

export default EditableInput;
