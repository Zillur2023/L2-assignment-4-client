import { baseApi } from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "user/create-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    getUser: builder.query({
      query: (email) => ({
        url: `/user/${email}`,
        method: "GET",
      }),
    }),
    getUserById: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetUserQuery, useGetUserByIdQuery } =
  userApi;
