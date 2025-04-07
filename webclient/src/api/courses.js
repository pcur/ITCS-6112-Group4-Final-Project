import axios from './axios';

export const getAllCourses = () => axios.get('/courses');
export const getCourse = (courseId) => axios.get(`/courses/${courseId}`);
export const getCourseStudents = (courseId) => axios.get(`/courses/${courseId}/students`);
export const getCoursePreferences = (courseId) => axios.get(`/courses/${courseId}/preferences`);
export const createCourse = (data) => axios.post('/courses', data);
export const updateCourse = (courseId, data) => axios.patch(`/courses/${courseId}`, data);
export const updateCoursePreferences = (courseId, prefs) =>
  axios.patch(`/courses/${courseId}/preferences`, prefs);
export const deleteCourse = (courseId) => axios.delete(`/courses/${courseId}`);
