import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { User, UserPost, ApiResponse } from "../types/types";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${apiKey}`);
      return headers;
    },
  }),
  tagTypes: ["Users", "CVs"],

  endpoints: (builder) => ({
    // All users
    getAllUsers: builder.query<User[], void>({
      query: () => `users`,
      transformResponse: (response: ApiResponse<User>) => response.items,
      providesTags: ["Users"],
    }),

    // Create user
    createUser: builder.mutation<User, UserPost>({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: [newUser],
      }),
      invalidatesTags: ["Users"],
    }),

    // Update user
    updateUser: builder.mutation<User, { id: string; data: UserPost }>({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    // Delete user
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = api;
