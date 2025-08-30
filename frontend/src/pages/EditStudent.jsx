<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-M">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Student Page</title>
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
        .container {
            margin: 2rem auto;
            max-width: 600px;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: bold;
            color: #555;
        }
        .form-group input,
        .form-group select {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            font-size: 1rem;
        }
        .form-button {
            width: 100%;
            padding: 0.8rem;
            border: none;
            border-radius: 4px;
            background-color: #28a745;
            color: white;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .form-button:hover {
            background-color: #218838;
        }
        .heading {
            text-align: center;
            margin-bottom: 2rem;
            color: #333;
        }
        .message {
            text-align: center;
            font-size: 1.2rem;
            color: #555;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect } = React;

        // --- Mock API & Hooks ---
        // These simulate react-router-dom and our api.js file.
        const mockApi = {
            getStudentById: async (id) => {
                console.log(`Mock API: Fetching student with ID: ${id}`);
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve({
                            _id: id,
                            name: 'Jane Doe',
                            rollNumber: 'R4321',
                            course: 'M.Sc',
                            yearOfStudy: '2',
                            status: 'Active'
                        });
                    }, 1000); // Simulate network delay
                });
            },
            updateStudent: async (id, formData) => {
                console.log(`Mock API: Updating student ${id} with data:`, formData);
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve({ ...formData, _id: id });
                    }, 500);
                });
            }
        };

        const useParams = () => ({ id: '123-abc-456' }); // Mock ID from URL
        const useNavigate = () => {
            return (path) => {
                alert(`Redirecting to ${path}... (In a real app, this would change the URL)`);
            };
        };


        // --- StudentForm Component ---
        const StudentForm = ({ onSubmit, initialData = {} }) => {
          const [formData, setFormData] = useState({
            name: '', rollNumber: '', course: '', yearOfStudy: '', status: 'Active',
          });

          useEffect(() => {
            if (Object.keys(initialData).length > 0) {
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
            setFormData(prev => ({ ...prev, [name]: value }));
          };

          const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(formData);
          };

          return (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="rollNumber">Roll Number</label>
                <input type="text" id="rollNumber" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="course">Course</label>
                <input type="text" id="course" name="course" value={formData.course} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="yearOfStudy">Year of Study</label>
                <input type="number" id="yearOfStudy" name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} required min="1"/>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="Graduated">Graduated</option>
                </select>
              </div>
              <button type="submit" className="form-button">Update Student</button>
            </form>
          );
        };


        // --- EditStudentPage Component ---
        const EditStudentPage = () => {
          const { id } = useParams();
          const navigate = useNavigate();
          const [student, setStudent] = useState(null);
          const [loading, setLoading] = useState(true);
          const [error, setError] = useState('');

          useEffect(() => {
            const fetchStudent = async () => {
              try {
                const data = await mockApi.getStudentById(id);
                setStudent(data);
              } catch (err) {
                setError('Failed to fetch student details.');
                console.error(err);
              } finally {
                setLoading(false);
              }
            };
            fetchStudent();
          }, [id]);

          const handleUpdate = async (formData) => {
            try {
              await mockApi.updateStudent(id, formData);
              navigate('/');
            } catch (err) {
              console.error('Failed to update student:', err);
              alert('Error: Could not update student. Please check the console for details.');
            }
          };

          if (loading) {
            return <p className="message">Loading student details...</p>;
          }

          if (error) {
            return <p className="message" style={{ color: 'red' }}>{error}</p>;
          }

          return (
            <div className="container">
              <h1 className="heading">Edit Student Information</h1>
              {student && <StudentForm initialData={student} onSubmit={handleUpdate} />}
            </div>
          );
        };

        // --- Render App ---
        ReactDOM.render(<EditStudentPage />, document.getElementById('root'));
    </script>
</body>
</html>
