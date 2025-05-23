import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No need to import Router here
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
import Register from './pages/Register';
import InstructorDashboard from './pages/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AssignmentsPage from './pages/AssignmentsPage';
import AddUser from './pages/AddUser';

// Add other pages as needed

function AppRoutes() {
  return (
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
      <Route path="/instructor" element={<InstructorDashboard />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/assignments" element={<AssignmentsPage />} />
      <Route path="/add-user" element={<AddUser />} />

      {/* Add more routes here */}
    </Routes>
  );
}

export default AppRoutes;
