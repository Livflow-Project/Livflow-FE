type DropdownProps = {
  children: React.ReactNode;
  dropdownRef: React.RefObject<HTMLDivElement>;
};

const Dropdown = ({ children, dropdownRef }: DropdownProps) => (
  <div
    className='absolute left-0 z-10 mt-1 w-full rounded-lg border bg-neutral-50 shadow-lg'
    ref={dropdownRef}
    role='listbox'
    id='category-options'
  >
    <div className='max-h-[257px] overflow-y-auto'>{children}</div>
  </div>
);

export default Dropdown;
