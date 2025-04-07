import axios from './axios';

export const getAllStudents = () => axios.get('/students');
export const getStudent = (studentId) => axios.get(`/students/${studentId}`);
export const getStudentEnrollments = (studentId) =>
  axios.get(`/students/${studentId}/enrollments`);
export const enrollStudent = (studentId, courseId) =>
  axios.post(`/students/${studentId}/enroll/${courseId}`);
export const dropStudent = (studentId, courseId) =>
  axios.delete(`/students/${studentId}/drop/${courseId}`);
