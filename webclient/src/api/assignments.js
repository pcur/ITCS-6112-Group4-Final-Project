import axios from './axios';

export const getAllAssignments = () => axios.get('/assignments');
export const generateAssignments = () => axios.post('/assignments/generate');
