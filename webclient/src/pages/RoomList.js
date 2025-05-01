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
    fetchRooms(); // Refresh
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🏢 All Rooms</h2>

      <button onClick={() => navigate('/rooms/new')} style={styles.addButton}>
        ➕ Add Room
      </button>

      {rooms.length === 0 && <p>No rooms available.</p>}

      {rooms.map((room) => (
        <div key={room._id} style={styles.roomItem}>
          <div style={styles.roomInfo}>
            <div>
              <div style={styles.roomTitle}>
                {room.building} - Room {room.roomNumber}
              </div>
              <div style={styles.roomDetails}>
                <strong>Capacity:</strong> {room.capacity}
              </div>
            </div>
            <div style={styles.roomActions}>
              <button
                onClick={() => navigate(`/rooms/${room._id}`)}
                style={styles.viewButton}
              >
                View
              </button>
              <button
                onClick={() => handleDelete(room._id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      <DashboardButton />
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '2rem',
    display: 'block',
    marginLeft: 'auto',
  },
  roomItem: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  roomInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  roomTitle: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  roomDetails: {
    fontSize: '1rem',
    color: '#555',
  },
  roomActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    alignItems: 'flex-end',
  },
  viewButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
};

export default RoomList;
