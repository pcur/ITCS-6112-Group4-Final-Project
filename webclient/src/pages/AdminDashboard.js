import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📋 Admin Dashboard</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <button onClick={() => navigate('/courses')}>📚 Manage Courses</button>
        <button onClick={() => navigate('/rooms')}>🏫 Manage Rooms</button>
        <button onClick={() => navigate('/assignments')}>📌 View Room Assignments</button>
        <button onClick={() => navigate('/assignments/generator')}>⚙️ Generate Room Assignments</button>
        <button onClick={() => navigate('/students')}>👩‍🎓 Manage Students</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
