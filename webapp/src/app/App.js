import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Demo from 'features/demo/Demo'
import MainFrame from '../common/MainFrame';
import LoginPage from 'features/auth/user/LoginPage';


function App() {
  return (
    <Routes>
      <Route exact={true} path="/login" element={<LoginPage/>}/>
      <Route path="/" element={<MainFrame/>}>
        <Route path="/" element={<Demo/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  );
}

export default App;
