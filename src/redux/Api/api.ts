import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserRoleEnum } from '../../models/UserRoleEnum';
import { UserStatusEnum } from '../../models/userStatusEnum';
import { RootState } from '../store';
import { IBook, IBorrowHistory, IUser } from './model/types';

export interface createUserRequest {
  _id?: string;
  email: string;
  name: string;
  password: string;
  role: UserRoleEnum;
  status: UserStatusEnum;
}

export interface createBookRequest {
  title: string;
  description: string;
  genre: string;
  author: string;
  published_year: number;
  quantity: number;
}

export interface createUpdateBorrowHistoryRequest {
  _id?: string;
  user: string;
  book: string;
}

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

    createUser: builder.mutation<{ user: IUser }, createUserRequest>({
      query: (user) => ({
        url: `users`,
        method: "POST",
        body: user
      })
    }),
    updateUser: builder.mutation<{ user: IUser }, createUserRequest>({
      query: ({ _id, ...rest }) => ({
        url: `users/${_id}`,
        method: "PUT",
        body: rest
      })
    }),

    getBook: builder.query<{ Book: IBook }, string>({
      query: (id) => ({ url: `books/${id}` }),

    }),

    getAllBook: builder.query<{ Books: { bookList: IBook[] } }, null>({
      query: () => ({ url: `books/` }),
    }),

    createBook: builder.mutation<{ Book: IBook }, createBookRequest>({
      query: (book) => ({
        url: `books`,
        method: "POST",
        body: book
      })
    }),
    updateBook: builder.mutation<{ Book: IBook }, IBook>({
      query: ({ _id, ...rest }) => ({
        url: `books/${_id}`,
        method: "PUT",
        body: rest
      })
    }),

    deleteBook: builder.mutation<{ Book: IBook }, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE"
      })
    }),

    getBorrowingHistory: builder.query<{ BorrowHistoryData: IBorrowHistory }, string>({
      query: (id) => ({ url: `borrowhistory/${id}` }),

    }),

    getAllBorrowingHistory: builder.query<{ BorrowingHistory: IBorrowHistory[] }, null>({
      query: () => ({ url: `borrowhistory/` }),
    }),

    createBorrowingHistory: builder.mutation<{ BorrowingHistory: IBorrowHistory }, createUpdateBorrowHistoryRequest>({
      query: (borrowHistory) => ({
        url: `borrowhistory`,
        method: "POST",
        body: borrowHistory
      })
    }),

    updateBorrowingHistory: builder.mutation<{ BorrowingHistory: IBorrowHistory }, createUpdateBorrowHistoryRequest>({
      query: ({ _id, ...rest }) => ({
        url: `borrowhistory/${_id}`,
        method: "PUT",
        body: rest
      })
    })
  }),
})


export const {
  useGetUserQuery,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,

  useGetBookQuery,
  useGetAllBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,

  useGetBorrowingHistoryQuery,
  useGetAllBorrowingHistoryQuery,
  useCreateBorrowingHistoryMutation,
  useUpdateBorrowingHistoryMutation,
} = api