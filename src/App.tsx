import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
      </Route>

      <Route path='/login' element={<Login />} />
    </Routes>
  );
};

export default App;
