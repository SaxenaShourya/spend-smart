import React, { useState, useEffect } from "react";
import { object, string, number, date } from "yup";
import { toast } from "react-toastify";
import moment from "moment";
import { parseDate } from "@internationalized/date";
import { NumericFormat } from "react-number-format";

import { useDispatch, useSelector } from "react-redux";
import {
  useGetExpenseQuery,
  useAddExpenseMutation,
} from "../../features/api/apiSlices/expenseApiSlice";
import { updateLoader } from "../../features/loader/loaderSlice";

import { TransactionForm } from "../../components/Forms";
import validateForm from "../../utils/validateForm";
import TransactionTable from "../../components/Tables/TransactionTable";

const Expenses = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: parseDate(moment().format("YYYY-MM-DD")),
  });
  const [errors, setErrors] = useState({});
  const [totalExpense, setTotalExpense] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isRefetchDeleteModal = useSelector(
    (state) => state.deleteTransactionModal.refetch
  );
  const isRefetchViewAndUpdateModal = useSelector(
    (state) => state.transactionViewAndUpdateModal.refetch
  );

  const expenseCategories = [
    { label: "Groceries", value: "groceries" },
    { label: "Utilities", value: "utilities" },
    { label: "Transportation", value: "transportation" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Clothing", value: "clothing" },
    { label: "Other", value: "other" },
  ];

  const validationSchema = object({
    title: string()
      .required("Title is required.")
      .min(5, "Title must be atleast 5 characters long.")
      .max(15, "Title should not be more than 15 characters."),
    amount: number("Amount must be a number")
      .required("Amount is required.")
      .positive("Amount must be positive."),
    description: string()
      .required("Description is required.")
      .min(5, "Description must be atleast 5 characters long.")
      .max(80, "Description should not be more than 80 characters."),
    date: date().required("Date is required."),
    category: string()
      .required("Category is required.")
      .oneOf(
        [
          "groceries",
          "utilities",
          "transportation",
          "healthcare",
          "entertainment",
          "clothing",
          "other",
        ],
        "Invalid category selected."
      ),
  });

  const chipColorMap = {
    groceries: "success",
    utilities: "default",
    transportation: "success",
    healthcare: "warning",
    entertainment: "danger",
    clothing: "warning",
    other: "default",
  };

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    validateForm(e.target.name, e.target.value, validationSchema, setErrors);
  };
  const handleDateChange = (newDate) => {
    setFormData({ ...formData, date: newDate });
  };

  const [addExpense, { isLoading: addExpenseLoading }] =
    useAddExpenseMutation();
  const {
    data,
    isLoading: getExpenseLoading,
    refetch,
  } = useGetExpenseQuery({
    page: currentPage,
    pageSize: 10,
  });
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      await refetch();
      if (data?.expenses) {
        setTotalExpense(data.totalExpense);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.error ||
          "An unexpected error occurred while fetching data!"
      );
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      dispatch(updateLoader(40));

      const formattedDate = moment({
        year: formData.date.year,
        month: formData.date.month - 1,
        day: formData.date.day,
      }).format("YYYY-MM-DD");
      const updatedFormData = {
        ...formData,
        date: formattedDate,
      };

      const res = await addExpense(updatedFormData).unwrap();

      dispatch(updateLoader(60));
      toast.success(res.message || "Expense added successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || "Unexpected Internal Server Error!");
    } finally {
      await refetch();
      dispatch(updateLoader(100));
    }
  };

  useEffect(() => {
    fetchData();
    if (isRefetchDeleteModal || isRefetchViewAndUpdateModal) fetchData();
  }, [data, isRefetchDeleteModal, isRefetchViewAndUpdateModal]);

  const hasErrors = Object.values(errors).some((error) => !!error);

  return (
    <>
      <h3 className="text-3xl lg:text-5xl mt-4 text-center">
        Total Expense -{" "}
        <span className="text-red-400">
          $
          <NumericFormat
            className="ml-1 text-2xl lg:text-4xl"
            value={totalExpense}
            displayType={"text"}
            thousandSeparator={true}
          />
        </span>
      </h3>
      <section className="w-full h-full flex flex-col lg:flex-row px-6 md:px-8 lg:px-12 pt-6 space-y-8 lg:space-y-0 lg:space-x-8">
        <TransactionForm
          button="Add Expense"
          categories={expenseCategories}
          btnColor="danger"
          formData={formData}
          errors={errors}
          hasErrors={hasErrors}
          isLoading={addExpenseLoading}
          handleOnChange={handleOnChange}
          handleDateChange={handleDateChange}
          handleSubmit={handleSubmit}
        />
        <TransactionTable
          data={data?.expenses}
          name="expense"
          rowsPerPage={10}
          chipColorMap={chipColorMap}
          isLoading={getExpenseLoading}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </>
  );
};

export default Expenses;
