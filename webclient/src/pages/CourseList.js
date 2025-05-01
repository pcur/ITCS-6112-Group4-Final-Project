import React, { useEffect, useState } from 'react';
import { getAllCourses, deleteCourse } from '../api/courses';
import { enrollStudent, dropStudent, getStudentEnrollments } from '../api/students'; // Make sure these exist
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardButton from '../components/dashboardButton';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch all courses
  const fetchCourses = async () => {
    const res = await getAllCourses();
    setCourses(res.data);
  };

  // Fetch the student's enrolled courses
  const fetchStudentCourses = async () => {
    if (user?.role === 'student') {
      const res = await getStudentEnrollments(user._id);
      setEnrolledCourseIds(res.data.map(course => course._id));
    }
  };
  
  
  const handleDelete = async (id) => {
    await deleteCourse(id);
    fetchCourses();
  };

  const handleEnroll = async (courseId) => {
    try {
      await enrollStudent(user._id, courseId);
      alert('Enrolled successfully!');
      fetchStudentCourses();
    } catch (err) {
      alert('Enrollment failed.');
      console.error(err);
    }
  };

  const handleDrop = async (courseId) => {
    try {
      await dropStudent(user._id, courseId);
      alert('Dropped successfully!');
      fetchStudentCourses();
    } catch (err) {
      alert('Drop failed.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchStudentCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>

      {user?.role !== 'student' && (
        <button onClick={() => navigate('/courses/new')}>+ Add Course</button>
      )}

      <ul>
        {courses.map((course) => {
          const isEnrolled = enrolledCourseIds.includes(course._id);
          return (
            <li key={course._id}>
              {course.name} ({course.capacity} students)

              <button onClick={() => navigate(`/courses/${course._id}`)}>Details</button>

              {user?.role === 'admin' && (
                <button onClick={() => handleDelete(course._id)}>Delete</button>
              )}

              {user?.role === 'student' && (
                isEnrolled ? (
                  <button onClick={() => handleDrop(course._id)}>Drop</button>
                ) : (
                  <button onClick={() => handleEnroll(course._id)}>Enroll</button>
                )
              )}
            </li>
          );
        })}
      </ul>

      <DashboardButton />
    </div>
  );
}

export default CourseList;
