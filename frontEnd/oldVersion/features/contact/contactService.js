import axios from "axios";
const API_URL = "http://localhost:5000";

// user send Message
const contact = async (contactData) => {
  const response = await axios.post(`${API_URL}/contact`, contactData);
  console.log(response.data);
  return response.data;
};

// get all messages
const getAllMessages = async () => {
  const response = await axios.get(`${API_URL}/contact`);
  return response.data;
};

// get single message
const getSingleMessage = async (messageId) => {
  const response = await axios.get(`${API_URL}/contact/${messageId}`);
  return response.data;
};

// Delete All Messages
const deleteAllMessages = async () => {
  const response = await axios.delete(`${API_URL}/contact`);
  return response.data;
};

// Delete single message
const deleteSingleMessage = async (messageId) => {
  const response = await axios.delete(`${API_URL}/contact/${messageId}`);
  return response.data;
};

const contactService = {
  contact,
  getAllMessages,
  getSingleMessage,
  deleteAllMessages,
  deleteSingleMessage,
};
export default contactService;
