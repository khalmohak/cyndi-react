import React from 'react';
import { Navigate, Route, Redirect } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import {LoginView,isLoggedIn} from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import SettingsView from 'src/views/settings/SettingsView';
import ResoucresList from 'src/views/resources/index';

let route = (isAuthenticated,cookies)=>{

  if(isAuthenticated || cookies.loggedIn==true){
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
          { path: '404', element: <LoginView /> },
          { path: '/', element: <Navigate to="/login" /> },
          { path: '*', element: <Navigate to="/404" /> }
        ]
      }
    ])
  }
};
console.log("Routes "+isLoggedIn);
// if(isLoggedIn){
//   routes = [
//     {
//       path: 'app',
//       element: <DashboardLayout />,
//       children: [
//         { path: 'customers', element: <CustomerListView /> },
//         { path: 'dashboard', element: <DashboardView /> },
//         { path: 'products', element: <ProductListView /> },
//         { path: 'settings', element: <SettingsView /> },
//         { path: 'resources', element: <ResoucresList /> },
//         { path: '*', element: <Navigate to="/404" /> }
//       ]
//     },
//     {
//       path: '/',
//       element: <MainLayout />,
//       children: [
//         { path: 'login', element: <LoginView /> },
//         { path: '404', element: <NotFoundView /> },
//         { path: '/', element: <Navigate to="/login" /> },
//         { path: '*', element: <Navigate to="/404" /> }
//       ]
//     }
//   ];
// }
// else{
//   routes = [
//     {
//       path: '/',
//       element: <MainLayout />,
//       children: [
//         { path: 'login', element: <LoginView /> },
//         { path: '404', element: <LoginView /> },
//         { path: '/', element: <Navigate to="/login" /> },
//         { path: '*', element: <Navigate to="/404" /> }
//       ]
//     }
//   ];
// }









export default route;
