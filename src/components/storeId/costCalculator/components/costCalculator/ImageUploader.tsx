import { ChangeEvent, useRef, useState } from 'react';

import { imageIcon } from '@/assets/assets';
import { showErrorToast } from '@/utils/toast';
import { useFormContext } from 'react-hook-form';
import IconButton from '@/components/common/IconButton';

const ImageUploader = () => {
  const [imageLoadError, setImageLoadError] = useState(false);

  const VITE_IMAGE_REQUEST_URL = 'https://api.livflow.co.kr:8443';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { watch, setValue } = useFormContext();

  const recipeImg = watch('recipe_img');
  const imagePreview = watch('recipe_img_preview');

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Base64로 변환하는 대신 File 객체 자체를 저장
      setValue('recipe_img', file);

      // 미리보기용 URL 생성
      const previewUrl = URL.createObjectURL(file);
      setValue('recipe_img_preview', previewUrl);
      setImageLoadError(false);
    }
  };

  const handleRemoveImage = () => {
    // 미리보기 URL이 있으면 메모리에서 해제
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setValue('recipe_img', null);
    setValue('recipe_img_preview', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setImageLoadError(false);
  };

  const handleImageError = () => {
    console.error('이미지 로드 실패');
    showErrorToast('이미지 오류가 발생하였습니다.');
    setImageLoadError(true);
  };

  return (
    <article className='h-[58%] w-full rounded-xl bg-white/50'>
      <ul className='flex h-full flex-col items-start justify-between gap-4 p-5'>
        <li className='costCalculator_label font-semibold'>메뉴 이미지 등록</li>

        <li className='flex h-[calc(100%-48px)] w-full items-center justify-center'>
          <div className='flex h-full w-full items-center justify-center overflow-hidden'>
            {recipeImg && !imageLoadError ? (
              <div className='relative flex max-h-full max-w-full flex-grow items-center justify-center overflow-hidden rounded-xl'>
                <img
                  src={
                    typeof recipeImg === 'string'
                      ? VITE_IMAGE_REQUEST_URL + recipeImg
                      : imagePreview
                  }
                  alt='업로드된 이미지'
                  className='block max-h-full max-w-full rounded-xl object-contain'
                  onError={handleImageError}
                />
                <div className='absolute right-2 top-2 z-10'>
                  <IconButton type='delete' onClick={handleRemoveImage} />
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
