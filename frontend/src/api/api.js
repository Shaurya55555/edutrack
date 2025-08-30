import axios from 'axios';

// Create a pre-configured instance of axios
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if your backend runs on a different port
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetches all students, with optional query for filtering.
 * @param {object} query - Optional query params like { name, rollNumber }.
 * @returns {Promise<Array>} A promise that resolves to an array of students.
 */
export const getStudents = async (query = {}) => {
  try {
    const params = new URLSearchParams(query).toString();
    const res = await API.get(`/students?${params}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

/**
 * Fetches a single student by their ID.
 * @param {string} id - The ID of the student.
 * @returns {Promise<Object>} A promise that resolves to the student object.
 */
export const getStudentById = async (id) => {
  try {
    const res = await API.get(`/students/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching student with id ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new student.
 * @param {object} studentData - The data for the new student.
 * @returns {Promise<Object>} A promise that resolves to the newly created student.
 */
export const createStudent = async (studentData) => {
  try {
    const res = await API.post('/students', studentData);
    return res.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

/**
 * Updates an existing student.
 * @param {string} id - The ID of the student to update.
 * @param {object} studentData - The new data for the student.
 * @returns {Promise<Object>} A promise that resolves to the updated student object.
 */
export const updateStudent = async (id, studentData) => {
  try {
    const res = await API.put(`/students/${id}`, studentData);
    return res.data;
  } catch (error) {
    console.error(`Error updating student with id ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a student.
 * @param {string} id - The ID of the student to delete.
 * @returns {Promise<Object>} A promise that resolves to a confirmation message.
 */
export const deleteStudent = async (id) => {
  try {
    const res = await API.delete(`/students/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting student with id ${id}:`, error);
    throw error;
  }
};

/**
 * Authenticates a user with a Google ID token.
 * @param {string} token - The Google ID token.
 * @returns {Promise<Object>} A promise that resolves to the user object and a message.
 */
export const googleLogin = async (token) => {
  try {
    const res = await API.post('/auth/google', { token });
    return res.data;
  } catch (error) {
    console.error('Error with Google login:', error);
    throw error;
  }
};
