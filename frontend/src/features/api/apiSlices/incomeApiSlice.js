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
    addIncome: builder.mutation({
      query: (data) => ({
        url: `${INCOMES_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateIncome: builder.mutation({
      query: ({ _id, data }) => ({
        url: `${INCOMES_URL}/${_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteIncome: builder.mutation({
      query: (_id) => ({
        url: `${INCOMES_URL}/${_id}`,
        method: "DELETE",
      }),
    }),
    getIncome: builder.query({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: `${INCOMES_URL}?page=${page}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllIncomesQuery,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
  useGetIncomeQuery,
  useAddIncomeMutation,
} = incomeApiSlice;
