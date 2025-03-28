import { ChangeEvent, useRef } from 'react';

import DeleteButton from '@/components/common/DeleteButton';
import { imageIcon } from '@/assets/assets';
import { useFormContext } from 'react-hook-form';

const ImageUploader = () => {
  const { VITE_IMAGE_REQUEST_URL } = import.meta.env;

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
  };

  return (
    <article className='h-[58%] w-full rounded-xl bg-white/50'>
      <ul className='flex flex-col items-start justify-between h-full gap-5 p-5 text-xl font-semibold text-main'>
        <li>메뉴 이미지 등록</li>
        <li className='flex items-center justify-center w-full h-full'>
          <div className='flex h-[330px] w-[356px] items-center justify-center overflow-hidden'>
            {recipeImg ? (
              <div className='relative max-w-full max-h-full'>
                <img
                  src={
                    typeof recipeImg === 'string'
                      ? `${VITE_IMAGE_REQUEST_URL}${recipeImg}`
                      : imagePreview
                  }
                  alt='업로드된 이미지'
                  className='object-contain max-w-full max-h-full cursor-pointer rounded-xl'
                  onClick={handleImageClick}
                  onError={(e) =>
                    console.error('이미지 로드 실패:', e.currentTarget.src)
                  }
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
