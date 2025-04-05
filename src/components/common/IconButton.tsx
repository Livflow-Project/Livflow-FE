import { buttonIcons } from '@/assets/assets';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type IconButtonProps = {
  onClick: () => void;
  type: 'edit' | 'delete';
};

const IconButton = ({ onClick, type }: IconButtonProps) => {
  const baseClasses = 'flex h-7 w-7 items-center justify-center rounded-full';
  const typeClasses =
    type === 'delete' ? 'bg-red/60 hover:bg-red' : 'bg-main/60 hover:bg-main';

  const buttonClasses = twMerge(baseClasses, typeClasses);

  const iconSrc =
    type === 'delete' ? buttonIcons.deleteButton : buttonIcons.editButton;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className={buttonClasses}
    >
      <img src={iconSrc} alt={`${type} icon`} className='h-5 w-5' />
    </motion.button>
  );
};

export default IconButton;
