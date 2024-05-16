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
    getExpense: builder.query({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: `${EXPENSES_URL}?page=${page}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllExpensesQuery,
  useGetExpenseQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApiSlice;
