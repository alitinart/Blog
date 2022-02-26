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
      username: string,
      email: string,
      password: string,
      fullName: string
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
    loginUser: async (username: string, password: string) => {
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
    logoutUser: async (token: string, refreshTokenId: string) => {
      const res = await axios.post(
        `${API_URL}/general/users`,
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
  },

  postsRequest: {
    createPost: async (
      userId: string,
      title: string,
      description: string,
      attachments: "",
      banner: string
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
    deletePost: async (postId: string, userId: string) => {
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
