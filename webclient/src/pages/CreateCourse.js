import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createCourse } from '../api/courses';
import { getUsersByRole } from '../api/students';
import axios from 'axios';

const CreateCourse = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [instructors, setInstructors] = useState([]);
  const [courseData, setCourseData] = useState({
    name: '',
    code: '',
    capacity: 0,
    instructor: user?.role === 'instructor' ? user._id : '',
    preferredBuildings: [],
    preferredTimes: []
  });

  useEffect(() => {
    if (user?.role === 'student') {
      navigate(`/student`);
    }
  
    if (user?.role === 'admin') {
      const fetchInstructors = async () => {
        try {
          const data = await getUsersByRole('instructor');
          // Ensure data is an array before setting it
          if (Array.isArray(data)) {
            setInstructors(data); // Set instructors only if the data is an array
          } else {
            console.error('Expected an array of instructors, but received:', data);
          }
        } catch (error) {
          console.error('Failed to fetch instructors:', error);
        }
      };
  
      fetchInstructors();
    }
  }, [navigate, user]);
  

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCourse(courseData); // ✅ Use the helper function
      navigate('/admin');
    } catch (err) {
      console.error('Error creating course:', err);
    }
  };

  return (
    <div>
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Course Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="code">Course Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={courseData.code}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={courseData.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="instructor">Instructor:</label>
          {user?.role === 'instructor' ? (
            <input
              type="text"
              id="instructor"
              name="instructor"
              value={courseData.instructor}
              readOnly
            />
          ) : (
            <select
              id="instructor"
              name="instructor"
              value={courseData.instructor}
              onChange={handleChange}
              required
            >
              <option value="">Select Instructor</option>
              {Array.isArray(instructors) && instructors.length > 0 ? (
                instructors.map((instructor) => (
                  <option key={instructor._id} value={instructor._id}>
                    {instructor.name}
                  </option>
                ))
              ) : (
                <option disabled>No instructors available</option>
              )}
            </select>

          )}
        </div>

        <div>
          <label htmlFor="preferredBuildings">Preferred Buildings:</label>
          <input
            type="text"
            id="preferredBuildings"
            name="preferredBuildings"
            value={courseData.preferredBuildings}
            onChange={handleChange}
            placeholder="Comma separated"
          />
        </div>

        <div>
          <label htmlFor="preferredTimes">Preferred Times:</label>
          <input
            type="text"
            id="preferredTimes"
            name="preferredTimes"
            value={courseData.preferredTimes}
            onChange={handleChange}
            placeholder="Comma separated"
          />
        </div>

        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
