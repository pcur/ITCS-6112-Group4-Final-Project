import React, { useEffect, useState } from 'react';
import { getAllCourses, deleteCourse } from '../api/courses';
import { useNavigate } from 'react-router-dom';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    const res = await getAllCourses();
    setCourses(res.data);
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
      <button onClick={() => navigate('/courses/new')}>+ Add Course</button>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {course.name} ({course.capacity} students)
            <button onClick={() => navigate(`/courses/${course._id}`)}>Details</button>
            <button onClick={() => handleDelete(course._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
