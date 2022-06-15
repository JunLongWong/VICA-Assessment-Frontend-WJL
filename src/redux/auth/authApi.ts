import { api } from "../Api/api";
export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  token: string;
  status: string;
  userid: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
        validateStatus: (response, result) =>  response.status === 200 && result.token
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi