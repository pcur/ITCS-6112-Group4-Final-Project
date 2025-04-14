import React, { useEffect, useState } from 'react';
import { getAllStudents } from '../api/students';
import { useNavigate } from 'react-router-dom';
import DashboardButton from '../components/dashboardButton';

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllStudents();
      setStudents(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>All Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s._id}>
            {s.name} ({s.email})
            <button onClick={() => navigate(`/students/${s._id}`)}>Details</button>
          </li>
        ))}
      </ul>
      <DashboardButton />
    </div>
  );
}

export default StudentList;
