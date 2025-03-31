import { ChangeEvent, useRef, useState } from 'react';

import DeleteButton from '@/components/common/DeleteButton';
import { imageIcon } from '@/assets/assets';
import { showErrorToast } from '@/utils/toast';
import { useFormContext } from 'react-hook-form';

const ImageUploader = () => {
  const [imageLoadError, setImageLoadError] = useState(false);

  // const { VITE_IMAGE_REQUEST_URL } = import.meta.env;

  const fileInputRef = useRef<HTMLInputElement>(null);

  // React Hook Form 컨텍스트 사용
  const { watch, setValue } = useFormContext();

  // 이미지 미리보기 상태 감시
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
      <ul className='flex flex-col items-start justify-between h-full gap-5 p-5 text-xl font-semibold text-main'>
        <li>메뉴 이미지 등록</li>

        <li className='flex h-[calc(100%-48px)] w-full items-center justify-center'>
          <div className='flex items-center justify-center w-full h-full overflow-hidden'>
            {recipeImg && !imageLoadError ? (
              <div className='relative flex items-center justify-center flex-grow max-w-full max-h-full overflow-hidden rounded-xl'>
                <img
                  src={
                    typeof recipeImg === 'string'
                      ? // ? `${VITE_IMAGE_REQUEST_URL}${recipeImg}`
                        `https://api.livflow.co.kr:8443${recipeImg}`
                      : imagePreview
                  }
                  alt='업로드된 이미지'
                  className='block object-contain max-w-full max-h-full rounded-xl'
                  onError={handleImageError}
                />
                <div className='absolute z-10 right-2 top-2'>
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
