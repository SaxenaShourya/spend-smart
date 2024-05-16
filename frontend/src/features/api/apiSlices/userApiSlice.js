import { apiSlice } from "../apiSlice";
import { USERS_URL } from "../endpoints";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation } = userApiSlice;
