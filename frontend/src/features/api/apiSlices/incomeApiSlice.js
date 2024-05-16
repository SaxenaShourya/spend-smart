import { apiSlice } from "../apiSlice";
import { INCOMES_URL } from "../endpoints";

export const incomeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllIncomes: builder.query({
      query: () => ({
        url: `${INCOMES_URL}/all`,
        method: "GET",
      }),
    }),
    updateIncome: builder.mutation({
      query: ({ _id, data }) => ({
        url: `${INCOMES_URL}/${_id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllIncomesQuery, useUpdateIncomeMutation } =
  incomeApiSlice;
