import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getStudentEnrollments, dropStudent } from '../api/students';

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

  const handleDrop = async (courseId) => {
    try {
      await dropStudent(user._id, courseId);
      alert('Dropped from course successfully.');
      fetchEnrollments(); // refresh the list
    } catch (err) {
      console.error("Error dropping course:", err);
      alert('Failed to drop course.');
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchEnrollments();
    }
  }, [user]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎒 Student Dashboard</h1>
      <p style={styles.welcomeMessage}>Welcome, {user?.name || 'Student'}!</p>

      <div style={styles.buttonContainer}>
        <button onClick={() => navigate('/courses')} style={styles.button}>
          📚 View Available Courses
        </button>

        <div style={styles.enrollmentSection}>
          <h3>My Enrollments</h3>
          {enrolledCourses.length > 0 ? (
            <div style={styles.enrollmentList}>
              {enrolledCourses.map((course) => (
                <div key={course._id} style={styles.enrollmentItem}>
                  <div style={styles.courseInfo}>
                    <span style={styles.courseName}>{course.name}</span>
                    <div style={styles.courseActions}>
                      <button
                        onClick={() => navigate(`/courses/${course._id}`)}
                        style={styles.viewDetailsButton}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDrop(course._id)}
                        style={styles.dropButton}
                      >
                        Drop
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You are not enrolled in any courses yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  welcomeMessage: {
    fontSize: '1.2rem',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem', // Increased vertical spacing between buttons
    marginTop: '2rem',
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%', // Ensures button takes full width
    boxSizing: 'border-box', // Ensures padding and border are included in the width
  },
  enrollmentSection: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  enrollmentList: {
    paddingLeft: '0', // Remove bullet points by setting padding to 0
  },
  enrollmentItem: {
    marginBottom: '1rem',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  courseInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '2rem', // Increased space between the name and the action buttons
  },
  courseName: {
    fontWeight: 'bold',
    textAlign: 'left', // Left-align the course name
  },
  courseActions: {
    display: 'flex',
    gap: '1rem', // Space between the action buttons
  },
  viewDetailsButton: {
    padding: '5px 10px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  dropButton: {
    padding: '5px 10px',
    backgroundColor: '#F44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default StudentDashboard;
