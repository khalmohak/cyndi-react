import React from 'react';
import {Navigate} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import DashboardView from 'src/views/reports/DashboardView';
import {LoginView} from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ClassListView from 'src/views/product/ClassListView/index.js';
import SettingsView from 'src/views/settings/SettingsView';
import ResourcesList from 'src/views/resources/index';
import TeacherCard from 'src/views/teacherCard/ProductListView/index';
import {Register} from 'src/views/auth/Register';
import ClassCardIn from "./views/classCardIn/index";
import ActivityDetail from "./views/activityDetail";
import TeacherClassCardIn from "./views/teacherCardIn";
import {Syllabus} from './views/classDescriptionViewsTeacher/Syllabus';
import {ChapterPlan} from './views/classDescriptionViewsTeacher/ChapterPlan';
import {Classes} from './views/classDescriptionViewsTeacher/Classes';
import {Resources} from './views/classDescriptionViewsTeacher/Resources';
import AddDocuments from "./views/classDescriptionViewsTeacher/AddDocuments";
import AddMedia from "./views/classDescriptionViewsTeacher/AddMedia";
import AddLink from "./views/classDescriptionViewsTeacher/AddLink";

let route = (/*isAuthenticated*/) => {
  const isAlreadyLoggedIn = sessionStorage.getItem('loggedIn');
  // if(isAuthenticated || isAlreadyLoggedIn){
  if (isAlreadyLoggedIn) {
    if (sessionStorage.getItem('userRole') === 'Student') {
      return (
        [
          {
            path: 'app',
            element: <DashboardLayout/>,
            children: [
              {path: 'dashboard', element: <DashboardView/>},
              {path: 'class', element: <ClassListView/>},
              {path: 'student', element: <ClassCardIn/>},
              {path: 'settings', element: <SettingsView/>},
              {path: 'resources', element: <ResourcesList/>},
              {path: 'activity_detail', element: <ActivityDetail/>},
              // { path: 'zoom', element: <Zoom /> },
              {path: '*', element: <Navigate to="/404"/>}
            ]
          },
          {
            path: '/',
            element: <MainLayout/>,
            children: [
              {path: 'login', element: <LoginView/>},
              {path: 'register', element: <Register/>},
              {path: '404', element: <NotFoundView/>},
              {path: '/', element: <Navigate to="/login"/>},
              {path: '*', element: <Navigate to="/404"/>},

            ]
          }
        ]
      )
    } else if (sessionStorage.getItem('userRole') === 'Teacher') {
      return (
        [
          {
            path: 'app',
            element: <DashboardLayout/>,
            children: [
              {path: 'dashboard', element: <DashboardView/>},
              {path: 'class', element: <TeacherCard/>},
              {path: 'teacher', element: <TeacherClassCardIn/>},
              {path: 'settings', element: <SettingsView/>},
              {path: 'resources', element: <ResourcesList/>},
              {path: 'teacher/classes', element: <Classes/>},
              {path: 'teacher/resources', element: <Resources/>},
              {path: 'teacher/chapterplan', element: <ChapterPlan/>},
              {path: 'teacher/syllabus', element: <Syllabus/>},
              {path: 'teacher/resources/adddocuments', element: <AddDocuments/>},
              {path: 'teacher/resources/addmedia', element: <AddMedia/>},
              {path: 'teacher/resources/addlink', element: <AddLink/>},
              {path: '*', element: <Navigate to="/404"/>}
            ]
          },
          {
            path: '/',
            element: <MainLayout/>,
            children: [
              {path: 'login', element: <LoginView/>},
              {path: 'register', element: <Register/>},
              {path: '404', element: <NotFoundView/>},
              {path: 'teacher', element: <TeacherClassCardIn/>},

              {path: '/', element: <Navigate to="/login"/>},
              {path: '*', element: <Navigate to="/404"/>}
            ]
          }
        ]
      )
    }
  } else {
    return ([
      {
        path: 'app',
        element: <DashboardLayout/>,
        children: [

          {path: 'student', element: <ClassCardIn/>},
          {path: 'teacher', element: <TeacherClassCardIn/>},
          {path: 'teacher/classes', element: <Classes/>},
          {path: 'teacher/resources', element: <Resources/>},
          {path: 'teacher/chapterplan', element: <ChapterPlan/>},
          {path: 'teacher/syllabus', element: <Syllabus/>},
          {path: 'teacher/resources/adddocuments', element: <AddDocuments/>},

          {path: 'activity_detail', element: <ActivityDetail/>},
        ]
      },
      {
        path: '/',
        element: <MainLayout/>,
        children: [
          {path: 'login', element: <LoginView/>},
          {path: 'register', element: <Register/>},
          {path: '/', element: <Navigate to="/login"/>},
          {path: '*', element: <Navigate to="/login"/>}
        ]
      }
    ])
  }
};


export default route;
