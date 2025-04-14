import React, { useEffect, useState } from 'react';
import { getAllRooms, deleteRoom } from '../api/rooms';
import { useNavigate } from 'react-router-dom';
import DashboardButton from '../components/dashboardButton';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    const res = await getAllRooms();
    setRooms(res.data);
  };

  const handleDelete = async (id) => {
    await deleteRoom(id);
    fetchRooms(); // refresh
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div>
      <h2>All Rooms</h2>
      <button onClick={() => navigate('/rooms/new')}>+ Add Room</button>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            {room.building} - {room.roomNumber} ({room.capacity})
            <button onClick={() => navigate(`/rooms/${room._id}`)}>View</button>
            <button onClick={() => handleDelete(room._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <DashboardButton />
    </div>
  );
}

export default RoomList;
