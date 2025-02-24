import DeleteButton from '@/components/common/DeleteButton';
import { twMerge } from 'tailwind-merge';

type Recipe = {
  id: number;
  // 추가적인 레시피 정보를 여기에 넣을 수 있습니다.
};

type RecipeItemProps = {
  recipe: Recipe;
  isDeleteMode: boolean;
  onDelete: () => void;
};

const RecipeItem = ({ isDeleteMode, onDelete }: RecipeItemProps) => {
  return (
    <li
      className={twMerge(
        'border-gray relative h-[250px] w-[200px] rounded-lg border border-opacity-20 bg-white shadow-xl',
        isDeleteMode && 'border-none bg-gray-400/50'
      )}
    >
      {isDeleteMode && (
        <div className='absolute right-2 top-2 flex items-center justify-center rounded-full text-3xl text-red'>
          <DeleteButton onClick={onDelete} />
        </div>
      )}
    </li>
  );
};

export default RecipeItem;
