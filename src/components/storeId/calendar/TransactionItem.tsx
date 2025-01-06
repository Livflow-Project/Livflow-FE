// import { DayDetailTransaction } from '@/api/storeId/storeId.type';

// const TransactionItem = ({
//   transaction,
//   type,
//   index,
// }: {
//   transaction: DayDetailTransaction;
//   type: 'expense' | 'income';
//   index: number;
// }) => (
//   <div
//     key={`${type}-${index}`}
//     className='relative flex h-[45px] w-full items-center border-b border-underline/30 text-center'
//   >
//     <span className='w-[30%] text-lg font-normal'>{transaction.category}</span>
//     <span className='w-[40%] text-lg font-normal'>{transaction.detail}</span>
//     <span
//       className={`w-[30%] text-lg font-normal ${type === 'expense' ? 'text-red' : 'text-green'}`}
//     >
//       {type === 'expense' ? '- ' : '+ '}
//       {transaction.cost.toLocaleString()}원
//     </span>
//     {isEditMode && (
//       <div className='absolute inset-0 flex items-center justify-center gap-4 bg-white/80'>
//         <button
//           onClick={() => handleEdit(transaction)}
//           className='flex items-center justify-center w-8 h-8 rounded-full bg-main hover:bg-main/80'
//         >
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             className='w-5 h-5 text-white'
//             viewBox='0 0 20 20'
//             fill='currentColor'
//           >
//             <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
//           </svg>
//         </button>
//         <button
//           onClick={() => handleDelete(transaction)}
//           className='flex items-center justify-center w-8 h-8 rounded-full bg-red hover:bg-red/80'
//         >
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             className='w-5 h-5 text-white'
//             viewBox='0 0 20 20'
//             fill='currentColor'
//           >
//             <path
//               fillRule='evenodd'
//               d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
//               clipRule='evenodd'
//             />
//           </svg>
//         </button>
//       </div>
//     )}
//   </div>
// );

// export default TransactionItem;
