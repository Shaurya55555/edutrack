<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-M">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Student Page</title>
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
            box-sizing: border-box; /* Important for consistent sizing */
            font-size: 1rem;
        }
        .form-button {
            width: 100%;
            padding: 0.8rem;
            border: none;
            border-radius: 4px;
            background-color: #007bff;
            color: white;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .form-button:hover {
            background-color: #0056b3;
        }
         .heading {
            text-align: center;
            margin-bottom: 2rem;
            color: #333;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect } = React;

        // --- Mock API & Hooks ---
        // These simulate the functionality of external modules.
        const mockApi = {
            createStudent: async (formData) => {
                console.log("Mock API: Creating student with data:", formData);
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve({ ...formData, _id: new Date().getTime().toString() });
                    }, 500); // Simulate network delay
                });
            }
        };

        const useNavigate = () => {
            return (path) => {
                alert(`Redirecting to ${path}... (In a real app, this would change the URL)`);
            };
        };

        // --- StudentForm Component ---
        const StudentForm = ({ onSubmit, initialData = {} }) => {
          const [formData, setFormData] = useState({
            name: '',
            rollNumber: '',
            course: '',
            yearOfStudy: '',
            status: 'Active',
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
              <button type="submit" className="form-button">Submit</button>
            </form>
          );
        };

        // --- AddStudentPage Component ---
        const AddStudentPage = () => {
          const navigate = useNavigate();

          const handleAdd = async (formData) => {
            try {
              console.log("Submitting form data:", formData);
              await mockApi.createStudent(formData);
              navigate('/');
            } catch (error) {
              console.error('Failed to add student:', error);
              alert('Error: Could not add student. Please check the console for details.');
            }
          };

          return (
            <div className="container">
              <h1 className="heading">Add New Student</h1>
              <StudentForm onSubmit={handleAdd} />
            </div>
          );
        };

        // --- Render App ---
        ReactDOM.render(<AddStudentPage />, document.getElementById('root'));
    </script>
</body>
</html>

