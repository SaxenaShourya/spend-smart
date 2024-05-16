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
  }),
});

export const { useGetAllExpensesQuery } = expenseApiSlice;
