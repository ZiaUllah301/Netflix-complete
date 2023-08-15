import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  signin: "api/user/login",
  signup: "api/user/SignUp",
  forgetPassword: "api/user/forget-password",
  validateLink: ({ id, token }) => `api/user/linkValidate/${id}/${token}`,
  resetPassword: ({ id, token }) => `api/user/resetPassword/${id}/${token}`,
  getInfo: "api/user/getUserDetails",
  passwordUpdate: "user/update-password",
  makePayment: "api/user/createPayment",
};

const userApi = {
  signin: async ({ email, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.signin, {
        email,
        password,
      });
      return { response };
    } catch (err) {
      console.log(err);
      return { err };
    }
  },
  signup: async ({ username, password, email }) => {
    try {
      const response = await publicClient.post(userEndpoints.signup, {
        username,
        password,
        role: "user",
        email,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  forgetPassword: async ({ email }) => {
    try {
      const response = await publicClient.post(userEndpoints.forgetPassword, {
        email,
      });
      return { response };
    } catch (err) {
      console.log(err);
      return { err };
    }
  },
  validateOneTimeLink: async ({ id, token }) => {
    try {
      const response = await publicClient.get(
        userEndpoints.validateLink({ id, token })
      );
      return { response };
    } catch (err) {
      console.log(err);
      return { err };
    }
  },
  resetPassword: async ({ id, token, password }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.resetPassword({ id, token }),
        { password }
      );
      return { response };
    } catch (err) {
      console.log(err);
      return { err };
    }
  },
  getInfo: async (localStorageData) => {
    try {
      const token = localStorageData.token; // Replace with your actual token
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const body = {
        userId: localStorageData._id,
      };

      const response = await privateClient.post(
        userEndpoints.getInfo,
        {
          body,
        },
        {
          headers,
        }
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  makePayment: async ({ amount, currency }) => {
    try {
      const response = await privateClient.post(userEndpoints.makePayment, {
        currency,
        amount,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
