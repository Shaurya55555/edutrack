import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, deleteStudent } from '../api/api';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchRollNumber, setSearchRollNumber] = useState('');

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const query = {};
      if (searchName) query.name = searchName;
      if (searchRollNumber) query.rollNumber = searchRollNumber;
      
      const data = await getStudents(query);
      setStudents(data);
    } catch (err) {
      setError('Failed to fetch students. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchName, searchRollNumber]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        fetchStudents(); // Refresh the list after deletion
      } catch (err) {
        setError('Failed to delete student.');
        console.error(err);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents();
  };

  const containerStyle = {
    fontFamily: 'sans-serif',
    margin: '2rem auto',
    padding: '0 2rem',
    maxWidth: '1200px',
  };

  const searchBarStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '8px',
  };

  const inputStyle = {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    flexGrow: 1,
  };
  
  const buttonStyle = {
    padding: '0.5rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  };

  const thTdStyle = {
    padding: '1rem',
    textAlign: 'left',
    borderBottom: '1px solid #dee2e6',
  };
  
  const thStyle = {
      ...thTdStyle,
      background: '#e9ecef',
  };

  const actionsStyle = {
    display: 'flex',
    gap: '0.5rem',
  };

  return (
    <div style={containerStyle}>
      <h2>Student Directory</h2>
      <form onSubmit={handleSearch} style={searchBarStyle}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Search by roll number..."
          value={searchRollNumber}
          onChange={(e) => setSearchRollNumber(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={{...buttonStyle, backgroundColor: '#007bff', color: 'white'}}>Search</button>
      </form>

      {loading && <p>Loading students...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Roll No</th>
              <th style={thStyle}>Course</th>
              <th style={thStyle}>Year</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id}>
                  <td style={thTdStyle}>{student.name}</td>
                  <td style={thTdStyle}>{student.rollNumber}</td>
                  <td style={thTdStyle}>{student.course}</td>
                  <td style={thTdStyle}>{student.yearOfStudy}</td>
                  <td style={thTdStyle}>{student.status}</td>
                  <td style={thTdStyle}>
                    <div style={actionsStyle}>
                      <Link to={`/edit/${student._id}`}>
                        <button style={{...buttonStyle, backgroundColor: '#ffc107'}}>Edit</button>
                      </Link>
                      <button onClick={() => handleDelete(student._id)} style={{...buttonStyle, backgroundColor: '#dc3545', color: 'white'}}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{...thTdStyle, textAlign: 'center'}}>No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;

