import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CourseDetailsPage from '../pages/CourseDetailsPage';
import CoursePage from '../pages/CoursesPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage'; 
import EnterEmailPage from '../pages/EnterEmailPage'; 
import EnterCodePage from '../pages/EnterCodePage'; 
import ResetPassword from '../pages/ResetPassword';
import ProfilePage from '../pages/ProfilePage';
import AdminCoursesPage from '../pages/AdminCoursesPage';
import AdminUsersPage from '../pages/AdminUsersPage';
import AboutUs from '../pages/AboutUsPage';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/course/:courseId" element={<CourseDetailsPage />} />
            <Route path="/SignUpPage" element={<SignUpPage />} />
            <Route path="/EnterEmailPage" element={<EnterEmailPage />} />
            <Route path="/EnterCodePage" element={<EnterCodePage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/Dashboard/*" element={<Dashboard />}>
                <Route path="AdminUsersPage" element={<AdminUsersPage />} />
                <Route path="AdminCoursesPage" element={<AdminCoursesPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
