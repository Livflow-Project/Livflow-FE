export const selectStyles = (hasError: boolean) => ({
  container: (provided: any) => ({
    ...provided,
    width: '60%',
    height: '42px',
  }),
  control: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    height: '100%',
    fontSize: '18px',
    backgroundColor: '#F8F8F8',
    borderRadius: '0.4rem',
    borderColor: hasError ? '#D10000' : state.isFocused ? '#4D4D4D' : '#666666',
    borderWidth: hasError || state.isFocused ? '2px' : '1px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: hasError
        ? '#D10000'
        : state.isFocused
          ? '#4D4D4D'
          : '#666666',
    },
    animation: hasError ? 'blinkingBorder 1s infinite' : 'none',
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: '0.5rem',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  }),
  option: (provided: any, state: { isSelected: any; isFocused: any }) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#4D4D4D'
      : state.isFocused
        ? '#EEF2FF'
        : 'transparent',
    color: state.isSelected ? 'white' : 'inherit',
    cursor: 'pointer',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#666666',
    fontSize: '18px',
    textAlign: 'center',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    textAlign: 'center',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    textAlign: 'center',
  }),
});
