import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MasterLayout from "./layouts/admin/MasterLayout";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";
import Home from "./components/frontend/Home";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import axios from "axios";
import Page_403 from './components/errors/Page_403'
import AdminPrivateRoute from "./AdminPrivateRoute";
import PageNotFound from "./components/errors/PageNotFound";
import Category from "./components/admin/category/Category";
import AddCategory from "./components/admin/category/AddCategory";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});


function App() {
  return (
    <div className="App">
      {/* nested routes */}
      <Router>
        <Routes>

          <Route exact path="/" element={<Home />} />

          <Route exact path="/register" element={<Register />} />

          <Route path="*" element={<PageNotFound />} />

          <Route exact path="/login" element={localStorage.getItem('auth_token') ? <Navigate to='/' replace /> : <Login />} />

          <Route path="/403" element={<Page_403 />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminPrivateRoute><MasterLayout /></AdminPrivateRoute>} >
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/category' element={<Category />} />
            <Route path='/admin/Addcategory' element={<AddCategory />} />
            <Route path='/admin/ViewCategory' element={<Category />} />
            <Route path='/admin/profile' element={<Profile />} />
            <Route index element={<Navigate to="/admin/dashboard" />} />
          </Route>



        </Routes>
      </Router>

    </div>
  );
}

export default App;
