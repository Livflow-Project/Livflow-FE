import { motion } from 'framer-motion';

type FeatureCardProps = {
  image: string;
  title: string;
  description1: string;
  description2: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  image,
  title,
  description1,
  description2,
}) => {
  return (
    <motion.article
      className='flex w-[70%] min-w-[840px] max-w-[900px] flex-col items-center justify-center rounded-xl bg-white px-6 py-11 shadow-2xl'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <img alt={title} src={image} className='max-h-[120px] md:max-h-[150px]' />
      <h2 className='mb-6 mt-4 text-2xl font-bold text-main md:mb-10 md:mt-6 md:text-3xl'>
        {title}
      </h2>

      <p className='text-center text-base font-medium text-gray-600 md:text-lg'>
        {description1}
      </p>
      <p className='mt-2 text-center text-base font-medium text-gray-600 md:text-lg'>
        {description2}
      </p>
    </motion.article>
  );
};

export default FeatureCard;
