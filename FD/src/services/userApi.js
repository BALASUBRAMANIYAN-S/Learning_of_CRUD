import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import users from "../types/userType"
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<users>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    addUser: builder.mutation<users>({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
    }),
    updateUser: builder.mutation<users>({
      query: ({ id, ...rest }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteUser: builder.mutation<users>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
