import { forwardRef } from 'react';
import { motion } from 'framer-motion';

type VideoFeatureCardProps = {
  title: string;
  description: string;
  videoSrc: string;
  alt: string;
  index: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const VideoFeatureCard = forwardRef<HTMLVideoElement, VideoFeatureCardProps>(
  (
    { title, description, videoSrc, index, onMouseEnter, onMouseLeave },
    ref
  ) => {
    return (
      <motion.div
        className='group transform overflow-hidden rounded-xl border border-underline/20 shadow-lg transition-transform duration-700 hover:scale-110 hover:shadow-xl'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 * index }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className='bg-gray-50 p-4 text-left'>
          <h3 className='text-xl font-semibold text-main'>{title}</h3>
          <p className='mt-1 text-sm text-gray-600'>{description}</p>
        </div>
        <div className='relative overflow-hidden'>
          <video
            ref={ref}
            src={videoSrc}
            muted
            loop
            playsInline
            preload='metadata'
            className='h-[350px] w-full scale-105 transform-gpu object-center'
          />
          <div className='absolute inset-0 flex items-center justify-center bg-caption/30 transition-opacity duration-300 group-hover:opacity-0'>
            <div className='rounded-full bg-white p-3 transition-transform group-hover:scale-110'>
              <svg
                className='h-8 w-8 text-main'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M8 5v14l11-7z' />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

VideoFeatureCard.displayName = 'VideoFeatureCard';

export default VideoFeatureCard;
