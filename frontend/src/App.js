import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/landing_page/index'
import Register from './pages/registration/index'
import Login from './pages/login/index'
import MainPage from './pages/main_page/index';
import Documents from './pages/documents/index';
import OpenCollabs from './pages/open_collabs/index';
import Profile from './pages/profile/index';
import UserProfile from './pages/profile/userProfile';
import AddDoc from './pages/documents/add_doc';
import { v4 } from 'uuid';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={user ? (<Navigate replace to={"/main_page"} />) : (<Register />)} />
      <Route path="/login" element={user ? (<Navigate replace to={"/main_page"} />) : (<Login />)} />
      <Route path="/main_page" element={user ? (<MainPage />) : (<Register />)} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/open_collabs" element={<OpenCollabs />} />
      <Route path="/userProfile/:fullname" element={<UserProfile />} />
      <Route path="/main_page/profile" element={<Profile />} />
      <Route path="/documents/add_doc" element={<AddDoc />}>
        <Route path="" element={<Navigate to={`/documents/add_doc/${v4()}`} />} />
        <Route path=":id" element={<AddDoc />} />
      </Route>
    </Routes>
  );
}

export default App;
