import React, { useState } from 'react';
import { createCourse } from '../api/courses';
import { useNavigate } from 'react-router-dom';
import DashboardButton from '../components/dashboardButton'; // Import the DashboardButton

function CreateCourse() {
  const [form, setForm] = useState({ name: '', capacity: '', preferredBuilding: '', preferredTime: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, capacity, preferredBuilding, preferredTime } = form;
    const courseData = {
      name,
      capacity,
      preferences: { preferredBuilding, preferredTime },
    };
    await createCourse(courseData);
    navigate('/courses');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Course Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="capacity"
          placeholder="Capacity"
          type="number"
          value={form.capacity}
          onChange={handleChange}
        />
        <input
          name="preferredBuilding"
          placeholder="Preferred Building"
          value={form.preferredBuilding}
          onChange={handleChange}
        />
        <input
          name="preferredTime"
          placeholder="Preferred Time"
          value={form.preferredTime}
          onChange={handleChange}
        />
        <button type="submit">Create Course</button>
      </form>

      {/* Add the DashboardButton */}
      <DashboardButton />
    </div>
  );
}

export default CreateCourse;
