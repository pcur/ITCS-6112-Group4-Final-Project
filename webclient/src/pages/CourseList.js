import React, { useEffect, useState } from 'react';
import { getAllCourses, deleteCourse } from '../api/courses';
import { enrollStudent, dropStudent, getStudentEnrollments } from '../api/students';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchCourses = async () => {
    const res = await getAllCourses();
    setCourses(res.data);
  };

  const fetchStudentCourses = async () => {
    if (user?.role === 'student') {
      const res = await getStudentEnrollments(user._id);
      setEnrolledCourseIds(res.data.map(course => course._id));
    }
  };

  const fetchInstructorCourses = () => {
    if (user?.role === 'instructor') {
      const filteredCourses = courses.filter(course => course.instructor === user._id);
      setInstructorCourses(filteredCourses);
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

  useEffect(() => {
    if (user?.role === 'instructor') {
      fetchInstructorCourses();
    }
  }, [user, courses]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📚 Courses</h2>

      {user?.role === 'admin' && (
        <button onClick={() => navigate('/courses/new')} style={styles.addButton}>
          ➕ Add Course
        </button>
      )}

      {(user?.role === 'instructor' ? instructorCourses : courses).length === 0 && (
        <p>No courses available.</p>
      )}

      {(user?.role === 'instructor' ? instructorCourses : courses).map((course) => {
        const isEnrolled = enrolledCourseIds.includes(course._id);

        return (
          <div key={course._id} style={styles.courseItem}>
            <div style={styles.courseInfo}>
              <div>
                <div style={styles.courseName}>{course.name}</div>
                <div style={styles.courseDetails}>
                  {course.instructor && (
                    <div><strong>Instructor:</strong> {course.instructor.name || course.instructor}</div>
                  )}
                  {course.building && (
                    <div><strong>Building:</strong> {course.building}</div>
                  )}
                  {course.time && (
                    <div><strong>Time:</strong> {course.time}</div>
                  )}
                </div>
              </div>
              <div style={styles.courseActions}>
                <button
                  onClick={() => navigate(`/courses/${course._id}`)}
                  style={styles.detailsButton}
                >
                  View Details
                </button>

                {user?.role === 'admin' && (
                  <button
                    onClick={() => handleDelete(course._id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                )}

                {user?.role === 'student' && (
                  isEnrolled ? (
                    <button
                      onClick={() => handleDrop(course._id)}
                      style={styles.dropButton}
                    >
                      Drop
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course._id)}
                      style={styles.enrollButton}
                    >
                      Enroll
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '2rem',
    display: 'block',
    marginLeft: 'auto',
  },
  courseItem: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  courseInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  courseName: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  courseDetails: {
    fontSize: '0.95rem',
    color: '#555',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  courseActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    alignItems: 'flex-end',
  },
  detailsButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
  enrollButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
  dropButton: {
    backgroundColor: '#ff9800',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
};

export default CourseList;
