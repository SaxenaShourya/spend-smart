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
  }),
});

export const { useGetAllIncomesQuery } = incomeApiSlice;
