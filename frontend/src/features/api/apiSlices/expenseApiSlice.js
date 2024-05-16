import { apiSlice } from "../apiSlice";
import { EXPENSES_URL } from "../endpoints";

export const expenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllExpenses: builder.query({
      query: () => ({
        url: `${EXPENSES_URL}/all`,
        method: "GET",
      }),
    }),
    addExpense: builder.mutation({
      query: (data) => ({
        url: `${EXPENSES_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllExpensesQuery, useAddExpenseMutation } =
  expenseApiSlice;
