import React, { useState } from 'react';
import { createRoom } from '../api/rooms';
import { useNavigate } from 'react-router-dom';
import DashboardButton from '../components/dashboardButton'; // Import the DashboardButton

function CreateRoom() {
  const [form, setForm] = useState({
    building: '',
    roomNumber: '',
    capacity: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRoom(form);
    navigate('/rooms');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Create Room</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="building"
          placeholder="Building"
          value={form.building}
          onChange={handleChange}
        />
        <input
          name="roomNumber"
          placeholder="Room #"
          value={form.roomNumber}
          onChange={handleChange}
        />
        <input
          name="capacity"
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
        />
        <button type="submit">Create Room</button>
      </form>

      {/* Add the DashboardButton */}
      <DashboardButton />
    </div>
  );
}

export default CreateRoom;
