import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getStudentEnrollments } from '../api/students';

function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const fetchEnrollments = async () => {
    try {
      const res = await getStudentEnrollments(user._id);
      setEnrolledCourses(res.data);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchEnrollments();
    }
  }, [user]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎒 Student Dashboard</h1>
      <p>Welcome, {user?.name || 'Student'}!</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <button onClick={() => navigate('/courses')}>📚 View Available Courses</button>

        <div>
          <h3>My Enrollments</h3>
          {enrolledCourses.length > 0 ? (
            <ul>
              {enrolledCourses.map((course) => (
                <li key={course._id}>
                  {course.name} ({course.capacity} students)
                  <button onClick={() => navigate(`/courses/${course._id}`)}>View Details</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>You are not enrolled in any courses yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
