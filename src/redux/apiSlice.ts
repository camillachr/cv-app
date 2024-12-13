import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { User, UserPost, ApiResponse, CV, CVPost } from "../types/types";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

//? Jeg kunne også delt dette opp i to api-er (et for users og et for CV-er), men siden det er samme base url og nøkkel gjorde jeg ikke det.

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
    // All users ---------------------------------
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

    // All CVs --------------------------------------
    getAllCVs: builder.query<CV[], void>({
      query: () => `cvs`,
      transformResponse: (response: ApiResponse<CV>) => response.items,
      providesTags: ["CVs"],
    }),

    // CV
    getCV: builder.query<CV, string>({
      query: (id) => `cvs/${id}`,
      providesTags: ["CVs"],
    }),

    // Create CV
    createCV: builder.mutation<CV, CVPost>({
      query: (newCV) => ({
        url: "cvs",
        method: "POST",
        body: [newCV],
      }),
      transformResponse: (response: ApiResponse<CV>) => response.items[0],
      invalidatesTags: ["CVs"],
    }),

    // Update CV
    updateCV: builder.mutation<CV, { id: string; data: CVPost }>({
      query: ({ id, data }) => ({
        url: `cvs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CVs"],
    }),

    // Delete CV
    deleteCV: builder.mutation<void, string>({
      query: (id) => ({
        url: `cvs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CVs"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllCVsQuery,
  useGetCVQuery,
  useCreateCVMutation,
  useUpdateCVMutation,
  useDeleteCVMutation,
} = api;
