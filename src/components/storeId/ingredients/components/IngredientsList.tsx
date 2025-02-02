import { DayDetailTransaction } from '@/api/storeId/storeId.type';
import { IngredientsItem } from './IngredientsItem';

type IngredientsListProps = {
  transactions: DayDetailTransaction[] | null;
  isEditMode: boolean;
  onEdit: (transaction: DayDetailTransaction) => void;
  onDelete: (transaction: DayDetailTransaction) => void;
};

const IngredientsList = ({
  transactions,
  isEditMode,
  onEdit,
  onDelete,
}: IngredientsListProps) => (
  <div className='flex h-[calc(100%-130px)] w-full flex-col'>
    {transactions && transactions.length > 0 ? (
      transactions.map((transaction) => (
        <IngredientsItem
          key={transaction.transaction_id}
          transaction={transaction}
          isEditMode={isEditMode}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))
    ) : (
      <div className='my-auto w-full text-center text-2xl text-main'>
        입력된 지출 / 수입이 없습니다.
      </div>
    )}
  </div>
);

export default IngredientsList;
