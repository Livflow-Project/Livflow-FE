import { imageIcon } from '@/assets/assets';

const ImageUploader = () => {
  return (
    <article className='h-[58%] w-full rounded-xl bg-white/50'>
      <ul className='flex h-full flex-col items-start justify-between gap-5 p-5 text-xl font-semibold text-main'>
        <li>메뉴 이미지 등록</li>
        <li className='flex h-full w-full items-center justify-center'>
          <img
            src={imageIcon}
            alt='이미지 아이콘'
            className='cursor-pointer opacity-70 hover:opacity-100'
          />
        </li>
      </ul>
    </article>
  );
};

export default ImageUploader;
