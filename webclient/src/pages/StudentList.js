import React, { useEffect, useState } from 'react';
import { getUsersByRole } from '../api/students'; // Assuming you have an API to fetch users by role
import { useNavigate } from 'react-router-dom';

function UserList() {
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await getUsersByRole('student');
        const adminsRes = await getUsersByRole('admin');
        const instructorsRes = await getUsersByRole('instructor');

        setStudents(studentsRes.data);
        setAdmins(adminsRes.data);
        setInstructors(instructorsRes.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const renderUserGroup = (title, users, pathPrefix) => (
    <div style={styles.group}>
      <h3 style={styles.subheading}>{title}</h3>
      {users.length === 0 && <p>No users found.</p>}
      {users.map((user) => (
        <div key={user._id} style={styles.userCard}>
          <div style={styles.userInfo}>
            <div>
              <div style={styles.userName}>{user.name}</div>
              <div style={styles.userEmail}>{user.email}</div>
            </div>
            <button
              onClick={() => navigate(`/${pathPrefix}/${user._id}`)}
              style={styles.detailsButton}
            >
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👥 User Directory</h2>

      {renderUserGroup('Students', students, 'students')}
      {renderUserGroup('Admins', admins, 'admins')}
      {renderUserGroup('Instructors', instructors, 'instructors')}

      <div style={styles.bottomButtonContainer}>
        <button onClick={() => navigate('/add-user')} style={styles.addButton}>
          ➕ Add User
        </button>
      </div>
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
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  group: {
    marginBottom: '2rem',
  },
  subheading: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    borderBottom: '1px solid #ccc',
    paddingBottom: '0.5rem',
  },
  userCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  userInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  userEmail: {
    fontSize: '0.95rem',
    color: '#666',
  },
  detailsButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
  bottomButtonContainer: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default UserList;
