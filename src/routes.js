import React from 'react';
import {Navigate} from 'react-router-dom';
import DashboardLayout from './layouts/LayoutDashboard/dashboard';
import MainLayout from './layouts/MainLayout';
import DashboardView from './layouts/LayoutDashboard/views/ViewProfile';
import AddClass from './layouts/LayoutAddClass/views/addClass';
import {LoginView} from './layouts/LayoutLogin/views/LoginView';
import NotFoundView from './layouts/Layout404/views/NotFoundView';
import ClassListView from './layouts/LayoutDashboard/views/ViewClassStudent/index.js';
import SettingsView from './layouts/LayoutDashboard/Settings';
import ResourcesList from './layouts/LayoutResourceForm/views';
import Messaging from './layouts/LayoutDashboard/views/ViewMessaging/index';
import Notifications from './layouts/LayoutDashboard/views/ViewNotifications/index';
import TeacherCard from './layouts/LayoutDashboard/views/ViewClassTeacher/index';
import {Register} from './layouts/LayoutRegister/views/Register';
import ClassCardIn from "./layouts/LayoutClassScreen/Student/views";
import ActivityDetail from "./layouts/LayoutDetailedResource/ActivityDetail/views";
import TeacherClassCardIn from "./layouts/LayoutClassScreen/Teacher/views";
import {Classes} from './layouts/LayoutDetailedResource/views/Classes';
import AddNotificationsCard from "./layouts/LayoutDashboard/views/ViewNotifications/AddNotificationsCard";
import {Resources} from "./layouts/LayoutDetailedResource/views/Resources";
import {ChapterPlan} from "./layouts/LayoutDetailedResource/views/ChapterPlan";
import {Syllabus} from "./layouts/LayoutDetailedResource/views/Syllabus";
import AddDocuments from "./layouts/LayoutDetailedResource/views/AddDocuments";
import AddMedia from "./layouts/LayoutDetailedResource/views/AddMedia";
import AddLink from './layouts/LayoutDetailedResource/views/AddLink'
import AddSyllabus from "./layouts/LayoutDetailedResource/views/AddSyllabus";
import AddChapterPlan from "./layouts/LayoutDetailedResource/views/AddChapterPlan";
import Profile from './layouts/LayoutEditProfile/views'
import TimeTable from "./layouts/LayoutTimeTable/views";

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
              //{path: 'add/class', element: <AddClass/>},
              {path: 'activity_detail', element: <ActivityDetail/>},
              {path: 'teacher', element: <TeacherClassCardIn/>},
              {path: 'settings', element: <SettingsView/>},
              {path: 'resources', element: <ResourcesList/>},
              {path: 'messaging', element: <Messaging/>},
              {path: 'notifications', element: <Notifications/>},
              {path: 'addnotifications', element: <AddNotificationsCard/>},
              {path: 'teacher/resources', element: <Resources/>},
              {path: 'teacher/chapterplan', element: <ChapterPlan/>},
              {path: 'teacher/syllabus', element: <Syllabus/>},
              {path: 'teacher/resources/adddocuments', element: <AddDocuments/>},
              {path: 'teacher/resources/addmedia', element: <AddMedia/>},
              {path: 'teacher/resources/addlink', element: <AddLink/>},
              {path: 'teacher/syllabus/addsyllabus', element: <AddSyllabus/>},
              {path: 'teacher/chapterplan/addchapterplan', element: <AddChapterPlan/>},

               {path: '*', element: <Navigate to="/404"/>}
            ]
          },
          {
            path: 'add',
            element: <DashboardLayout/>,
            children:[
              {path: 'class', element: <AddClass/>}
            ]
          },
          {
            path: 'edit',
            element: <DashboardLayout/>,
            children:[
              {path: 'profile', element: <Profile/>}
            ]
          },
          {
            path: 'timetable',
            element: <DashboardLayout/>,
            children:[
              {path: '/', element: <TimeTable/>}
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
