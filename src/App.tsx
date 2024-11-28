import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './layout/layout';
import Login from './pages/login';
import Store from './pages/store';
import StoreId from './pages/storeId';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path='/store/:id' element={<StoreId />} />
        </Route>

        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
