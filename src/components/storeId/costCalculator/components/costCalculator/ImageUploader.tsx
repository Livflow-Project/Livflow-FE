import { ChangeEvent, useRef } from 'react';

import DeleteButton from '@/components/common/DeleteButton';
import { imageIcon } from '@/assets/assets';
import { useFormContext } from 'react-hook-form';

const ImageUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // React Hook Form 컨텍스트 사용
  const { watch, setValue } = useFormContext();

  // 이미지 미리보기 상태 감시
  const imagePreview = watch('recipe_img');

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setValue('recipe_img', event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setValue('recipe_img', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <article className='h-[58%] w-full rounded-xl bg-white/50'>
      <ul className='flex h-full flex-col items-start justify-between gap-5 p-5 text-xl font-semibold text-main'>
        <li>메뉴 이미지 등록</li>
        <li className='flex h-full w-full items-center justify-center'>
          <div className='flex h-[330px] w-[356px] items-center justify-center overflow-hidden'>
            {imagePreview ? (
              <div className='relative max-h-full max-w-full'>
                <img
                  src={imagePreview}
                  alt='업로드된 이미지'
                  className='max-h-full max-w-full cursor-pointer rounded-xl object-contain'
                  onClick={handleImageClick}
                />
                <div className='absolute right-[5px] top-[5px]'>
                  <DeleteButton onClick={handleRemoveImage} />
                </div>
              </div>
            ) : (
              <img
                src={imageIcon}
                alt='이미지 아이콘'
                className='cursor-pointer opacity-70 hover:opacity-100'
                onClick={handleImageClick}
              />
            )}
          </div>
          <input
            type='file'
            accept='image/*'
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </li>
      </ul>
    </article>
  );
};

export default ImageUploader;
