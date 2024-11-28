import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './layout/Layout';
import Login from './pages/Login';
import Store from './pages/Store';
import StoreId from './pages/StoreId';
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
