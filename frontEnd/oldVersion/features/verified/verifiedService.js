import axios from "axios";

const verified = async (userData) => {
  const { userId, uniqueString } = userData;
  const response = await axios.get(
    `http://localhost:5000/api/verified/${userId}/${uniqueString}`
  );
  return response.data;
};

const authService = {
  verified,
};
export default authService;
