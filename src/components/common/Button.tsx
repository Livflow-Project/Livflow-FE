type ButtonProps = {
  type?: 'submit' | 'button';
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, type, onClick }: ButtonProps) => {
  return (
    <button type={type} className='soft_BcolorSet px-[25px]' onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
