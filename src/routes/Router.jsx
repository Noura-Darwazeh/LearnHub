import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CourseDetailsPage from '../pages/CourseDetailsPage'
import CoursePage from '../pages/CoursesPage';
import AboutUs from '../pages/AboutUsPage'
function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<CoursePage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/course/:courseId" element={<CourseDetailsPage />} /> {/* Define the course details route */}

            </Routes>
        </Router>
    );
}

export default App;
