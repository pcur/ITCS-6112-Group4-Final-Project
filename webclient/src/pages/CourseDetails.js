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

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [students, setStudents] = useState([]);
  const [preferences, setPreferences] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const courseRes = await getCourse(courseId);
      const studentRes = await getCourseStudents(courseId);

      setCourse(courseRes.data);
      setStudents(studentRes.data);

      // Only fetch preferences if user is not a student
      if (user?.role !== 'student') {
        const prefRes = await getCoursePreferences(courseId);
        setPreferences(prefRes.data);
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
    <div>
      <h2>Course Details</h2>

      {user?.role === 'student' ? (
        <div>
          <p><strong>Name:</strong> {course.name}</p>
          <p><strong>Capacity:</strong> {course.capacity}</p>
        </div>
      ) : (
        <>
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
        </>
      )}

      <h3>Enrolled Students</h3>
      <ul>
        {students.map((s) => (
          <li key={s._id}>
            {s.name} ({s.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetails;
