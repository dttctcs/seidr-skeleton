import { useSeidrAuth } from 'seidr-react';
import { Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from 'features/auth/user/LoginPage';
import MainFrame from '../common/MainFrame';
import Demo from 'features/demo/Demo';

const loginPath = '/login';

function Wrapper() {
  const { user, loading } = useSeidrAuth();
  if (loading) return;
  return user ? <MainFrame /> : <Navigate to={loginPath} />;
}

export default function App() {
  return (
    <Routes>
      <Route exact={true} path={loginPath} element={<LoginPage />} />
      <Route path='/' element={<Wrapper />}>
        <Route path='/demo' element={<Demo />} />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}
