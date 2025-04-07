import axios from './axios';

export const getAllRooms = () => axios.get('/rooms');
export const getRoom = (roomId) => axios.get(`/rooms/${roomId}`);
export const createRoom = (roomData) => axios.post('/rooms', roomData);
export const updateRoom = (roomId, roomData) => axios.patch(`/rooms/${roomId}`, roomData);
export const deleteRoom = (roomId) => axios.delete(`/rooms/${roomId}`);
