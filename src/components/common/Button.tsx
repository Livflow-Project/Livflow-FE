type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className='soft_BcolorSet px-[25px]' onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
