import React, { useEffect, useState } from 'react';
import { getAllCourses, deleteCourse } from '../api/courses';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchCourses = async () => {
    const res = await getAllCourses();
    let allCourses = res.data;

    if (user?.role === 'instructor') {
      allCourses = allCourses.filter(
        (course) => course.professor === user._id
      );
    }

    setCourses(allCourses);
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>

      {/* Admins & Instructors can create courses */}
      {(user?.role === 'admin' || user?.role === 'instructor') && (
        <button onClick={() => navigate('/courses/new')}>+ Add Course</button>
      )}

      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {course.name} ({course.capacity} students)

            <button onClick={() => navigate(`/courses/${course._id}`)}>
              Details
            </button>

            {/* Only Admins can delete */}
            {user?.role === 'admin' && (
              <button onClick={() => handleDelete(course._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
