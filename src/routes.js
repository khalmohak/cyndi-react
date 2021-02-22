import React from 'react';
import {Navigate} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout/dashboard';
import MainLayout from 'src/layouts/MainLayout';
import DashboardView from 'src/layouts/DashboardLayout/views/ViewProfile';
import AddClass from 'src/layouts/LayoutAddClass/addClass';
import {LoginView} from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ClassListView from 'src/layouts/DashboardLayout/views/ViewClassStudent/index.js';
import SettingsView from 'src/layouts/DashboardLayout/Settings';
import ResourcesList from 'src/views/resources/index';
import Messaging from 'src/layouts/DashboardLayout/views/ViewMessaging/index';
import Notifications from 'src/layouts/DashboardLayout/views/ViewNotifications/index';
import TeacherCard from 'src/layouts/DashboardLayout/views/ViewClassTeacher/index';
import {Register} from 'src/views/auth/Register';
import ClassCardIn from "./views/classCardIn/index";
import ActivityDetail from "./views/activityDetail";
import TeacherClassCardIn from "./views/teacherCardIn";
import {Classes} from './views/classDescriptionViewsTeacher/Classes';

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
              /*{path: 'student', element: <ClassCardIn/>},*/
              {path: 'messaging', element: <Messaging/>},
              {path: 'notifications', element: <Notifications/>},
              {path: 'settings', element: <SettingsView/>},
              {path: 'resources', element: <ResourcesList/>},
              /*{path: 'activity_detail', element: <ActivityDetail/>},*/
              // { path: 'zoom', element: <Zoom /> },
              // {path: '*', element: <Navigate to="/404"/>}
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
              // {path: '*', element: <Navigate to="/404"/>},

            ]
          }
        ]
      )
    }
    else if (sessionStorage.getItem('userRole') === 'Teacher') {
      return (
        [
          {
            path: 'app',
            element: <DashboardLayout/>,
            children: [
              {path: 'dashboard', element: <DashboardView/>},
              {path: 'class', element: <TeacherCard/>},
              // {path: 'add/class', element: <AddClass/>},

              /*{path: 'teacher', element: <TeacherClassCardIn/>},*/
              {path: 'settings', element: <SettingsView/>},
              {path: 'resources', element: <ResourcesList/>},
              {path: 'messaging', element: <Messaging/>},
              {path: 'notifications', element: <Notifications/>},
              /*{path: 'addnotifications', element: <AddNotificationCard/>},*/
              /*{path: 'teacher/resources', element: <Resources/>},*/
              /*{path: 'teacher/chapterplan', element: <ChapterPlan/>},*/
              /*{path: 'teacher/syllabus', element: <Syllabus/>},*/
              /* {path: 'teacher/resources/adddocuments', element: <AddDocuments/>},*/
              /*{path: 'teacher/resources/addmedia', element: <AddMedia/>},
              {path: 'teacher/resources/addlink', element: <AddLink/>},
              {path: 'teacher/syllabus/addsyllabus', element: <AddSyllabus/>},
              {path: 'teacher/chapterplan/addchapterplan', element: <AddChapterPlan/>},*/
              // {path: '*', element: <Navigate to="/404"/>}
            ]
          },
          /*{
            path: '/add/class',
            element: <AddClass/>
          },*/
          {
            path: '/',
            element: <MainLayout/>,
            children: [
              {path: 'login', element: <LoginView/>},
              {path: 'register', element: <Register/>},
              {path: '404', element: <NotFoundView/>},
              {path: 'teacher', element: <TeacherClassCardIn/>},

              {path: '/', element: <Navigate to="/login"/>},
              // {path: '*', element: <Navigate to="/404"/>}
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
          // {path: 'teacher/classes', element: <Classes/>},
          // {path: 'teacher/resources', element: <Resources/>},
          // {path: 'teacher/chapterplan', element: <ChapterPlan/>},
          // {path: 'teacher/syllabus', element: <Syllabus/>},
          // {path: 'teacher/resources/adddocuments', element: <AddDocuments/>},

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
