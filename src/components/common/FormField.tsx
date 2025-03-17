import { UseFormRegisterReturn } from 'react-hook-form';

type FormFieldProps = {
  label: string;
  register: UseFormRegisterReturn;
  placeholder?: string;
  required?: boolean;
  type?: string;
  className?: string;
};

const FormField = ({
  label,
  register,
  placeholder,
  required = false,
  type = 'text',
  className = '',
}: FormFieldProps) => (
  <li className='flex items-center justify-between'>
    <div className='relative flex items-center gap-2'>
      <label className='input_label'>{label}</label>
      {required && (
        <span className='absolute -right-1.5 -top-2 text-red'>*</span>
      )}
    </div>
    <input
      type={type}
      {...register}
      placeholder={placeholder}
      className={`input_box ${className}`}
    />
  </li>
);

export default FormField;
