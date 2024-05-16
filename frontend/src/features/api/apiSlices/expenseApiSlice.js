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
    updateExpense: builder.mutation({
      query: ({ _id, data }) => ({
        url: `${EXPENSES_URL}/${_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteExpense: builder.mutation({
      query: (_id) => ({
        url: `${EXPENSES_URL}/${_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutations,
  useDeleteExpenseMutation,
} = expenseApiSlice;
