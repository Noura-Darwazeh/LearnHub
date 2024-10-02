import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CourseDetailsPage from '../pages/CourseDetailsPage'
import CoursePage from '../pages/CoursesPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'; 
import EnterEmailPage from './pages/EnterEmailPage'; 
import EnterCodePage from './pages/EnterCodePage'; 
import ResetPassword from './pages/ResetPassword';
import ProfilePage from './pages/ProfilePage';
import AdminCoursesPage from './pages/AdminCoursesPage';
import AboutUs from '../pages/AboutUsPage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<CoursePage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/course/:courseId" element={<CourseDetailsPage />} /> {/* Define the course details route */}
                <Route path="/SignUpPage" element={<SignUpPage />} />
                <Route path="/EnterEmailPage" element={<EnterEmailPage />} />
                <Route path="/EnterCodePage" element={<EnterCodePage />} />
                <Route path="/LoginPage" element={<LoginPage />} />
                <Route path="/HomePage" element={<HomePage />} />
                <Route path="/ResetPassword" element={<ResetPassword />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/AdminCoursesPage" element={<AdminCoursesPage />} />
            </Routes>
        </Router>
    );
}

export default App;
