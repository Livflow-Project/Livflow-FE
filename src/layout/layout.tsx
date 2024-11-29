import Header from './header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />

      <main className='mt-[75px]'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
