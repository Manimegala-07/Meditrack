// services/api.js
import axios from 'axios';

export const getStudent = async (filter, value) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/students`, {
      params: { [filter]: value }
    });
    return { success: true, data: response.data[0] }; // assuming you want just the first match
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Error fetching student' };
  }
};

export const markStudentAsViewed = async (rollNo) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/students/mark-viewed/${rollNo}`);
      return response.data;
    } catch (err) {
      console.error(err);
      return { success: false, message: 'Error updating student' };
    }
  };
  