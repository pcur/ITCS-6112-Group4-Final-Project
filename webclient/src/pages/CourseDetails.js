import React, { useEffect, useState } from 'react';
import { getCourse, getCourseStudents, getCoursePreferences, updateCoursePreferences, updateCourse } from '../api/courses';
import { useParams } from 'react-router-dom';

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [students, setStudents] = useState([]);
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const courseRes = await getCourse(courseId);
      const studentRes = await getCourseStudents(courseId);
      const prefRes = await getCoursePreferences(courseId);

      setCourse(courseRes.data);
      setStudents(studentRes.data);
      setPreferences(prefRes.data);
    };
    fetchData();
  }, [courseId]);

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
      <input name="name" value={course.name || ''} onChange={handleCourseChange} />
      <input name="capacity" type="number" value={course.capacity || ''} onChange={handleCourseChange} />
      <button onClick={handleUpdateCourse}>Update Course</button>

      <h3>Preferences</h3>
      <input name="preferredBuilding" value={preferences.preferredBuilding || ''} onChange={handlePrefChange} placeholder="Preferred Building" />
      <input name="preferredTime" value={preferences.preferredTime || ''} onChange={handlePrefChange} placeholder="Preferred Time" />
      <button onClick={handleUpdatePreferences}>Update Preferences</button>

      <h3>Enrolled Students</h3>
      <ul>
        {students.map((s) => (
          <li key={s._id}>{s.name} ({s.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetails;
