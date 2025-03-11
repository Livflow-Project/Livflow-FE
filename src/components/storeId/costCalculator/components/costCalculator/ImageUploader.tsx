import { ChangeEvent, useRef } from 'react';

import DeleteButton from '@/components/common/DeleteButton';
import { imageIcon } from '@/assets/assets';
import { useFormContext } from 'react-hook-form';

const ImageUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // React Hook Form 컨텍스트 사용
  const { watch, setValue } = useFormContext();

  // 이미지 미리보기 상태 감시
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

      // 미리보기용 URL 생성 (UI 표시 목적)
      const previewUrl = URL.createObjectURL(file);
      // 미리보기용 URL을 별도 상태로 관리 (예: recipe_img_preview)
      setValue('recipe_img_preview', previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setValue('recipe_img', null);
    setValue('recipe_img_preview', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // 미리보기 URL이 있다면 해제
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
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
