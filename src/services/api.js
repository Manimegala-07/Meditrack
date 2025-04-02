import axios from 'axios';

// Get student by roll number
export const getStudentByRollNo = async (rollno) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/student/${rollno}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching student data:", error);
        throw error;
    }
};

// Get all students
export const getAllStudents = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/students');
        return response.data;
    } catch (error) {
        console.error("Error fetching all students:", error);
        throw error;
    }
};
