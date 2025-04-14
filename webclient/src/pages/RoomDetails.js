import React, { useEffect, useState } from 'react';
import { getRoom, updateRoom } from '../api/rooms';
import { useParams } from 'react-router-dom';
import DashboardButton from '../components/dashboardButton';

function RoomDetails() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await getRoom(roomId);
      setRoom(res.data);
      setForm(res.data);
    };
    fetchRoom();
  }, [roomId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateRoom(roomId, form);
    alert('Room updated!');
  };

  if (!room) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Room</h2>
      <input name="building" value={form.building} onChange={handleChange} />
      <input name="roomNumber" value={form.roomNumber} onChange={handleChange} />
      <input name="capacity" type="number" value={form.capacity} onChange={handleChange} />
      <button onClick={handleUpdate}>Save</button>

      <DashboardButton />
      
    </div>
  );
}

export default RoomDetails;
