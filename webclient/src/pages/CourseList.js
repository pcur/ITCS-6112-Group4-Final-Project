import React, { useEffect, useState } from 'react';
import { getAllCourses, deleteCourse } from '../api/courses';
import { enrollStudent } from '../api/students';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardButton from '../components/dashboardButton';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchCourses = async () => {
    const res = await getAllCourses();
    setCourses(res.data);
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    fetchCourses();
  };

  const handleEnroll = async (courseId) => {
    try {
      await enrollStudent(user._id, courseId);
      alert('Enrolled successfully!');
    } catch (err) {
      alert('Enrollment failed.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>

      {user?.role !== 'student' && (
        <button onClick={() => navigate('/courses/new')}>+ Add Course</button>
      )}

      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {course.name} ({course.capacity} students)

            <button onClick={() => navigate(`/courses/${course._id}`)}>Details</button>

            {user?.role === 'admin' && (
              <button onClick={() => handleDelete(course._id)}>Delete</button>
            )}

            {user?.role === 'student' && (
              <button onClick={() => handleEnroll(course._id)}>Enroll</button>
            )}
          </li>
        ))}
      </ul>

      <DashboardButton />
      
    </div>
  );
}

export default CourseList;
