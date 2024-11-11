import Calender from '../components/calendar/Calender';
import { useParams } from 'react-router-dom';

const StoreID = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className='flex h-[calc(100vh-75px)] items-center justify-center text-2xl font-semibold text-main'>
        상점의 가계부 정보를 찾을 수 없습니다. 이전 페이지로 이동해주세요.
      </div>
    );
  }

  return (
    <div className='flex h-[calc(100vh-75px)] flex-col justify-between p-[45px]'>
      <ul className='flex flex-col items-end gap-4'>
        <li className='text-2xl font-semibold text-main'>해당 스토어 이름</li>
        <li className='text-[15px] font-medium text-main'>해당 스토어 주소</li>
      </ul>
      <div className='h-[calc(100%-70px)]'>
        <div className='flex items-center justify-start gap-3'>
          <nav className='flex h-[55px] w-[135px] items-center justify-center rounded-tl-[10px] rounded-tr-[10px] bg-background'>
            <span className='text-[22px] font-normal text-main'>가계부</span>
          </nav>
          <nav className='flex h-[55px] w-[135px] items-center justify-center rounded-tl-[10px] rounded-tr-[10px] bg-background/60'>
            <span className='text-[22px] font-normal text-main/60'>
              원가계산
            </span>
          </nav>
        </div>
        <div className='h-[calc(100%-55px)] w-full bg-background'>
          <Calender storeId={parseInt(id)} />
        </div>
      </div>
    </div>
  );
};

export default StoreID;
