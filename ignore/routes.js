import React from 'react';
import { Navigate, Route, Redirect } from 'react-router-dom';
import DashboardLayout from 'src/layouts/LayoutDashboard/dashboard';
import MainLayout from 'src/layouts/MainLayout';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/layouts/LayoutDashboard/views/ViewProfile';
import {LoginView,isLoggedIn} from 'src/layouts/LayoutLogin/views/LoginView';
import NotFoundView from 'src/layouts/Layout404/views/NotFoundView';
import ProductListView from 'src/layouts/LayoutDashboard/views/ViewClassStudent';
import SettingsView from 'src/layouts/LayoutDashboard/Settings';
import ResoucresList from 'src/layouts/LayoutResourceForm/views';
import TeacherCard from 'src/layouts/LayoutDashboard/views/ViewClassTeacher/index';

let route = (isAuthenticated)=>{
const isAlreadyLoggedIn = sessionStorage.getItem('loggedIn');
  if(isAuthenticated || isAlreadyLoggedIn === 'true'){
      return(
       [
          {
            path: 'app',
            element: <DashboardLayout />,
            children: [
              { path: 'customers', element: <CustomerListView /> },
              { path: 'dashboard', element: <DashboardView /> },
              { path: 'products', element: <ProductListView /> },
              { path: 'settings', element: <SettingsView /> },
              { path: 'resources', element: <ResoucresList /> },
              { path: 'teacher', element: <TeacherCard /> },
              { path: '*', element: <Navigate to="/404" /> }
            ]
          },
          {
            path: '/',
            element: <MainLayout />,
            children: [
              { path: 'login', element: <LoginView /> },
              { path: '404', element: <NotFoundView /> },
              { path: '/', element: <Navigate to="/login" /> },
              { path: '*', element: <Navigate to="/404" /> }
            ]
          }
        ]
      )
    }
  else{
    return([
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: 'login', element: <LoginView /> },
          { path: '/', element: <Navigate to="/login" /> },
          { path: '*', element: <Navigate to="/login" /> }
        ]
      }
    ])
  }
};
console.log("Routes "+isLoggedIn);


export default route;
