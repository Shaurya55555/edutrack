import React, { useState, useEffect } from 'react';

const StudentForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    course: '',
    yearOfStudy: '',
    status: 'Active',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        rollNumber: initialData.rollNumber || '',
        course: initialData.course || '',
        yearOfStudy: initialData.yearOfStudy || '',
        status: initialData.status || 'Active',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333',
  };

  const inputStyle = {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  };
  
  const buttonStyle = {
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '1rem',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputGroupStyle}>
        <label htmlFor="name" style={labelStyle}>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>
      <div style={inputGroupStyle}>
        <label htmlFor="rollNumber" style={labelStyle}>Roll Number</label>
        <input
          type="text"
          id="rollNumber"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>
      <div style={inputGroupStyle}>
        <label htmlFor="course" style={labelStyle}>Course</label>
        <input
          type="text"
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>
      <div style={inputGroupStyle}>
        <label htmlFor="yearOfStudy" style={labelStyle}>Year of Study</label>
        <input
          type="number"
          id="yearOfStudy"
          name="yearOfStudy"
          value={formData.yearOfStudy}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>
      <div style={inputGroupStyle}>
        <label htmlFor="status" style={labelStyle}>Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Active">Active</option>
          <option value="Graduated">Graduated</option>
        </select>
      </div>
      <button type="submit" style={buttonStyle}>
        {initialData._id ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
};

export default StudentForm;
