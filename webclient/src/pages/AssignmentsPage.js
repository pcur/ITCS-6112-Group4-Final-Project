import React, { useEffect, useState } from 'react';
import { getAllAssignments, generateAssignments } from '../api/assignments';
import { useNavigate } from 'react-router-dom';
import DashboardButton from '../components/DashboardButton';

function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAssignments = async () => {
    try {
      const res = await getAllAssignments();
      setAssignments(res.data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await generateAssignments();
      await fetchAssignments(); // refresh list
      alert('Assignments generated!');
    } catch (err) {
      console.error('Error generating assignments:', err);
      alert('Failed to generate assignments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const filtered = assignments.filter((a) => {
    const courseName = a.course?.name?.toLowerCase() || '';
    const roomName = a.room?.name?.toLowerCase() || '';
    return courseName.includes(filter.toLowerCase()) || roomName.includes(filter.toLowerCase());
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📌 Room Assignments</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by course or room..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ flex: 1, marginRight: '1rem', padding: '0.5rem' }}
        />
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Assignments'}
        </button>
      </div>

      {filtered.length > 0 ? (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Course</th>
              <th>Room</th>
              <th>Time</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a._id}>
                <td>{a.course?.name}</td>
                <td>{a.room?.name}</td>
                <td>{a.assignedTime}</td>
                <td>{a.room?.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No assignments to display.</p>
      )}

        <DashboardButton />
    </div>
  );
}

export default AssignmentsPage;
