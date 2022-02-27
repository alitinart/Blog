import axios from "axios";

const API_KEY: any = process.env.API_KEY;
const API_URL: any = process.env.API_URL;

const requests = {
  userRequests: {
    getAllUsers: async () => {
      const res = await axios.get(`${API_URL}/general/users`, {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      return res.data;
    },
    registerUser: async (
      username: any,
      email: any,
      password: any,
      fullName: any
    ) => {
      const res = await axios.post(
        `${API_URL}/general/users/auth/register`,
        {
          username,
          email,
          password,
          fullName,
        },
        {
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );

      return res.data;
    },
    loginUser: async (username: any, password: any) => {
      const res = await axios.post(
        `${API_URL}/general/users/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );

      return res.data;
    },
    logoutUser: async (token: any, refreshTokenId: any) => {
      const res = await axios.post(
        `${API_URL}/general/users/auth/logout`,
        {
          refreshTokenId,
        },
        {
          headers: {
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    },
    authUser: async (token: any) => {
      const res = await axios.get(`${API_URL}/general/users/auth`, {
        headers: { Authorization: `Bearer ${token}`, "x-api-key": API_KEY },
      });

      return res.data;
    },
    adminCheck: async (token: string) => {
      const res = await axios.get(`${API_URL}/general/users/auth`, {
        headers: { Authorization: `Bearer ${token}`, "x-api-key": API_KEY },
      });

      const adminCheck = await axios.get(
        `${API_URL}/general/users/auth/admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": API_KEY,
            "user-id": res.data.data._id,
          },
        }
      );

      if (adminCheck.data.error) {
        return "";
      }

      return res.data.data._id;
    },
  },

  postsRequest: {
    createPost: async (
      userId: any,
      title: any,
      description: any,
      attachments: string,
      banner: any
    ) => {
      const res = await axios.post(
        `${API_URL}/general/posts`,
        {
          title,
          description,
          attachments,
          banner,
          timestamp: new Date(),
        },
        {
          headers: {
            "x-api-key": API_KEY,
            "user-id": userId,
          },
        }
      );

      return res.data;
    },
    getAllPosts: async () => {
      const res = await axios.get(`${API_URL}/general/posts`, {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      return res.data;
    },
    deletePost: async (postId: any, userId: any) => {
      const res = await axios.delete(`${API_URL}/general/posts`, {
        headers: {
          "user-id": userId,
          "x-api-key": API_KEY,
        },
        data: {
          postId,
        },
      });
      return res.data;
    },
    getPostByID: async (postId: any) => {
      const res = await axios.get(`${API_URL}/general/posts/${postId}`, {
        headers: { "x-api-key": API_KEY },
      });

      return res.data;
    },
  },

  tokenRequests: {
    getAllTokens: async () => {
      const res = await axios.get(`${API_URL}/general/tokens`, {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      return res.data;
    },
  },

  testRequest: async () => {
    const res = await axios.get(API_URL);

    return res.data;
  },
};

export default requests;
