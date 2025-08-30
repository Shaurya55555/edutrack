<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-M">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduTrack Home Page</title>
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f4f6f8;
            color: #333;
            margin: 0;
            padding: 2rem;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useCallback } = React;

        // --- Mock API ---
        // In a real app, this would make network requests.
        // Here, it simulates fetching and deleting data.
        let mockStudentData = [
            { _id: '1', name: 'Alice Johnson', rollNumber: 'R1001', course: 'B.Tech', yearOfStudy: 4, status: 'Active' },
            { _id: '2', name: 'Bob Williams', rollNumber: 'R1002', course: 'MBA', yearOfStudy: 1, status: 'Active' },
            { _id: '3', name: 'Charlie Brown', rollNumber: 'R1003', course: 'B.Sc', yearOfStudy: 4, status: 'Graduated' },
            { _id: '4', name: 'Diana Miller', rollNumber: 'R1004', course: 'M.Sc', yearOfStudy: 2, status: 'Active' },
        ];

        const api = {
            getStudents: async (query) => {
                console.log("Mock API: Fetching students with query", query);
                return new Promise(resolve => {
                    setTimeout(() => {
                        let data = [...mockStudentData];
                        if (query?.name) {
                            data = data.filter(s => s.name.toLowerCase().includes(query.name.toLowerCase()));
                        }
                        if (query?.rollNumber) {
                            data = data.filter(s => s.rollNumber.toLowerCase().includes(query.rollNumber.toLowerCase()));
                        }
                        resolve(data);
                    }, 500); // Simulate network delay
                });
            },
            deleteStudent: async (id) => {
                 console.log("Mock API: Deleting student", id);
                 return new Promise(resolve => {
                    setTimeout(() => {
                        mockStudentData = mockStudentData.filter(s => s._id !== id);
                        resolve({ message: 'Student removed' });
                    }, 300);
                 });
            }
        };
        
        // --- StudentList Component ---
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
              
              const data = await api.getStudents(query);
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
                await api.deleteStudent(id);
                fetchStudents();
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

          // Styles (as defined in the original component)
          const containerStyle = { margin: '2rem auto', padding: '0 2rem', maxWidth: '1200px' };
          const searchBarStyle = { display: 'flex', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' };
          const inputStyle = { padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', flexGrow: 1, fontSize: '1rem' };
          const buttonStyle = { padding: '0.5rem 1.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };
          const tableStyle = { width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', background: 'white' };
          const thTdStyle = { padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' };
          const thStyle = { ...thTdStyle, background: '#e9ecef' };
          const actionsStyle = { display: 'flex', gap: '0.5rem' };

          return (
            <div style={containerStyle}>
              <form onSubmit={handleSearch} style={searchBarStyle}>
                <input type="text" placeholder="Search by name..." value={searchName} onChange={(e) => setSearchName(e.target.value)} style={inputStyle} />
                <input type="text" placeholder="Search by roll number..." value={searchRollNumber} onChange={(e) => setSearchRollNumber(e.target.value)} style={inputStyle} />
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
                              <a href={`/edit/${student._id}`} onClick={(e) => e.preventDefault()} style={{textDecoration:'none'}}>
                                <button style={{...buttonStyle, backgroundColor: '#ffc107'}}>Edit</button>
                              </a>
                              <button onClick={() => handleDelete(student._id)} style={{...buttonStyle, backgroundColor: '#dc3545', color: 'white'}}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="6" style={{...thTdStyle, textAlign: 'center'}}>No students found.</td></tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          );
        };
        
        // --- HomePage Component ---
        const HomePage = () => {
          const pageStyle = {
            fontFamily: 'sans-serif',
            textAlign: 'center',
            color: '#333',
          };
          
          const headingStyle = {
              marginBottom: '2rem',
          };

          return (
            <div style={pageStyle}>
              <h1 style={headingStyle}>Student Records</h1>
              <StudentList />
            </div>
          );
        };
        
        // --- Render App ---
        ReactDOM.render(<HomePage />, document.getElementById('root'));
    </script>
</body>
</html>

