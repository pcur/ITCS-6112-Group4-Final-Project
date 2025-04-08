import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseList from './pages/CourseList';
import RoomList from './pages/RoomList';
import RoomDetails from './pages/RoomDetails';
import CreateRoom from './pages/CreateRoom';
import CourseDetails from './pages/CourseDetails';
import CreateCourse from './pages/CreateCourse';
import StudentList from './pages/StudentList';
import StudentDetails from './pages/StudentDetails';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';





// Add other pages as needed

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/courses" element={<CourseList />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/rooms/new" element={<CreateRoom />} />
        <Route path="/rooms/:roomId" element={<RoomDetails />} />
        <Route path="/courses/new" element={<CreateCourse />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/:studentId" element={<StudentDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
