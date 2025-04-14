import React, { useEffect, useState } from 'react';
import { getStudent, getStudentEnrollments, enrollStudent, dropStudent } from '../api/students';
import { getAllCourses } from '../api/courses';
import { useParams } from 'react-router-dom';
import DashboardButton from '../components/dashboardButton';

function StudentDetails() {
  const { studentId } = useParams();
  const [student, setStudent] = useState({});
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [s, e, c] = await Promise.all([
        getStudent(studentId),
        getStudentEnrollments(studentId),
        getAllCourses(),
      ]);
      setStudent(s.data);
      setEnrollments(e.data);
      setCourses(c.data);
    };
    fetchData();
  }, [studentId]);

  const handleEnroll = async () => {
    if (selectedCourse) {
      await enrollStudent(studentId, selectedCourse);
      const res = await getStudentEnrollments(studentId);
      setEnrollments(res.data);
    }
  };

  const handleDrop = async (courseId) => {
    await dropStudent(studentId, courseId);
    const res = await getStudentEnrollments(studentId);
    setEnrollments(res.data);
  };

  return (
    <div>
      <h2>{student.name}</h2>
      <p>Email: {student.email}</p>

      <h3>Enroll in Course</h3>
      <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
        <option value="">Select a course</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.name}
          </option>
        ))}
      </select>
      <button onClick={handleEnroll}>Enroll</button>

      <h3>Enrolled Courses</h3>
      <ul>
        {enrollments.map((course) => (
          <li key={course._id}>
            {course.name}
            <button onClick={() => handleDrop(course._id)}>Drop</button>
          </li>
        ))}
      </ul>
      <DashboardButton />
    </div>
  );
}

export default StudentDetails;
