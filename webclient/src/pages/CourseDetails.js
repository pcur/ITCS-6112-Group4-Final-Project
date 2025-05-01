import React, { useEffect, useState } from 'react';
import {
  getCourse,
  getCourseStudents,
  getCoursePreferences,
  updateCoursePreferences,
  updateCourse,
} from '../api/courses';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardButton from '../components/dashboardButton';

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [students, setStudents] = useState([]);
  const [preferences, setPreferences] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const courseRes = await getCourse(courseId);
      setCourse(courseRes.data);

      const prefRes = await getCoursePreferences(courseId);
      setPreferences(prefRes.data);

      if (user?.role !== 'student') {
        const studentRes = await getCourseStudents(courseId);
        setStudents(studentRes.data);
      }
    };
    fetchData();
  }, [courseId, user]);

  const handleCourseChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handlePrefChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleUpdateCourse = async () => {
    await updateCourse(courseId, course);
    alert('Course updated!');
  };

  const handleUpdatePreferences = async () => {
    await updateCoursePreferences(courseId, preferences);
    alert('Preferences updated!');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Course Details</h2>

      {/* Student View */}
      {user?.role === 'student' ? (
        <div>
          <p><strong>Name:</strong> {course.name}</p>
          <p><strong>Capacity:</strong> {course.capacity}</p>
          <p><strong>Preferred Time:</strong> {preferences.preferredTime || 'N/A'}</p>
          <p><strong>Assigned Room:</strong> {course.room || 'Not assigned'}</p>
        </div>
      ) : (
        <>
          <div>
            <input
              name="name"
              value={course.name || ''}
              onChange={handleCourseChange}
              placeholder="Course Name"
            />
            <input
              name="capacity"
              type="number"
              value={course.capacity || ''}
              onChange={handleCourseChange}
              placeholder="Capacity"
            />
            <button onClick={handleUpdateCourse}>Update Course</button>
          </div>

          <h3>Preferences</h3>
          <input
            name="preferredBuilding"
            value={preferences.preferredBuilding || ''}
            onChange={handlePrefChange}
            placeholder="Preferred Building"
          />
          <input
            name="preferredTime"
            value={preferences.preferredTime || ''}
            onChange={handlePrefChange}
            placeholder="Preferred Time"
          />
          <button onClick={handleUpdatePreferences}>Update Preferences</button>

          <p><strong>Assigned Room:</strong> {course.room || 'Not assigned'}</p>

          <h3>Enrolled Students</h3>
          <ul>
            {students.map((s) => (
              <li key={s._id}>
                {s.name} ({s.email})
              </li>
            ))}
          </ul>
        </>
      )}

      <DashboardButton />
    </div>
  );
}

export default CourseDetails;
