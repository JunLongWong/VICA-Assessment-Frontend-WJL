import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store';
import { IBook, IUser } from './model/types';


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),

  endpoints: (builder) => ({
    getUser: builder.query<{ user: IUser }, string>({
      query: (id) => ({ url: `users/${id}` }),

    }),
    getAllUser: builder.query<{ users: { user: IUser[] } }, null>({
      query: () => ({ url: `users/` }),
    }),
    deleteUser: builder.mutation<{ user: IUser }, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE"
      })
    }),

    createUser: builder.mutation<{ user: IUser }, null>({
      query: (user) => ({
        url: `users`,
        method: "POST",
        body: user
      })
    }),
    updateUser: builder.mutation<{ user: IUser }, IUser>({
      query: ({ _id, ...rest }) => ({
        url: `users/${_id}`,
        method: "PUT",
        body: rest
      })
    }),

    getAllBook: builder.query<{ Books: { bookList: IBook[] } }, null>({
      query: () => ({ url: `books/` }),
    }),
    deleteBook: builder.mutation<{ Book: IBook }, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE"
      })
    }),

  }),
})


export const {
  useGetUserQuery,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetAllBookQuery,
  useDeleteBookMutation,
} = api