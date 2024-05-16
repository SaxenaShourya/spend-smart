import React, { useState, useEffect } from "react";
import Chart from "../../components/Chart";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";

import { Income, Expense, Balance } from "../../utils/Icons";
import { useGetAllIncomesQuery } from "../../features/api/apiSlices/incomeApiSlice";
import { useGetAllExpensesQuery } from "../../features/api/apiSlices/expenseApiSlice";

const DashboardPage = () => {
  const user = useSelector((state) => state.auth.user.username);

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [recentHistory, setRecentHistory] = useState([]);

  const { data: incomeData, refetch: refetchIncomes } = useGetAllIncomesQuery();
  const { data: expenseData, refetch: refetchExpenses } =
    useGetAllExpensesQuery();

  const fetchData = async () => {
    try {
      await refetchIncomes();
      await refetchExpenses();
      if (incomeData) {
        setTotalIncome(incomeData?.totalIncome);
      }
      if (expenseData) {
        setTotalExpense(expenseData?.totalExpense);
      }
      const totalBalance =
        (incomeData?.totalIncome || 0) - (expenseData?.totalExpense || 0);
      setTotalBalance(totalBalance);

      const recentHistory = [
        ...(incomeData?.incomes || []).map((transaction) => ({
          ...transaction,
          type: "income",
        })),
        ...(expenseData?.expenses || []).map((transaction) => ({
          ...transaction,
          type: "expense",
        })),
      ];
      recentHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
      const recentTransactions = recentHistory.slice(0, 3);

      setRecentHistory(recentTransactions);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || "Unexpected Internal Server Error!");
    }
  };

  const incomeDates =
    incomeData?.incomes.map((income) =>
      moment(income.date).format("MM/DD/YYYY")
    ) || [];
  const incomeAmounts =
    incomeData?.incomes.map((income) => income.amount) || [];
  const expenseAmounts =
    expenseData?.expenses.map((expense) => expense.amount) || [];

  let data = [];

  if (incomeAmounts.length === 0 || expenseAmounts.length === 0) {
    data = [
      {
        name: "Data unavailable. Please add your incomes/expenses to populate this display.",
        income: 0,
        expense: 0,
      },
    ];
  } else {
    data = incomeDates.map((date, index) => ({
      name: date,
      income: incomeAmounts[index] || 0,
      expense: expenseAmounts[index] || 0,
    }));
  }

  useEffect(() => {
    fetchData();
  }, [incomeData, expenseData]);

  return (
    <section className="w-full h-full md:h-[90vh] px-3 md:px-6">
      <h2 className="text-2xl md:text-3xl lg:text-4xl mt-3 text-center sm:text-left text-pretty">
        Hello, {user}😊
      </h2>
      <h3 className="font-outfit text-sm md:text-base lg:text-lg text-center sm:text-left text-pretty">
        See what's happenning with your money, Lets Manage your
        incomes/expenses.{" "}
        <span className="font-bold text-primary">Spend Smartly!</span>
      </h3>
      <div className="w-full mt-8 flex flex-col sm:flex-row gap-y-4 justify-between items-center">
        <div className="px-6 py-4 border-2 w-full sm:w-[30%] border-secondary rounded-lg inline-flex justify-between items-center">
          <div>
            <h4 className="font-outfit text-base md:text-lg">Total Balance</h4>
            <h4 className="text-2xl md:text-3xl mt-1">
              $
              <NumericFormat
                className="ml-1 text-xl md:text-2xl"
                value={totalBalance}
                displayType={"text"}
                thousandSeparator={true}
              />
            </h4>
          </div>
          <Balance className="icon" />
        </div>
        <div className="px-6 py-4 border-2 w-full sm:w-[30%] border-secondary rounded-lg inline-flex justify-between items-center">
          <div>
            <h4 className="font-outfit text-base md:text-lg">Total Incomes</h4>
            <h4 className="text-2xl md:text-3xl text-emerald-400 mt-1">
              $
              <NumericFormat
                className="ml-1 text-xl md:text-2xl"
                value={totalIncome}
                displayType={"text"}
                thousandSeparator={true}
              />
            </h4>
          </div>
          <Income className="icon" />
        </div>
        <div className="px-6 py-4 border-2 w-full sm:w-[30%] border-secondary rounded-lg inline-flex justify-between items-center">
          <div>
            <h4 className="font-outfit text-base md:text-lg">Total Expenses</h4>
            <h4 className="text-2xl md:text-3xl text-red-400 mt-1">
              $
              <NumericFormat
                className="ml-1 text-xl md:text-2xl"
                value={totalExpense}
                displayType={"text"}
                thousandSeparator={true}
              />
            </h4>
          </div>
          <Expense className="icon" />
        </div>
      </div>
      <div className="w-full h-full md:h-[60%] mt-4 md:flex gap-x-4 overflow-hidden">
        <div className="w-full md:w-[60%] h-[25rem] md:h-full flex flex-col justify-center items-center overflow-x-scroll">
          <h5 className="text-2xl">Activity</h5>
          <div className="min-w-[20rem] w-full h-full">
            <Chart data={data} />
          </div>
        </div>
        <div className="w-full md:w-[40%] my-12 md:my-0">
          <h5 className="text-2xl text-center md:text-left">
            Recent Transactions
          </h5>
          <ul className="space-y-4 mt-4">
            {recentHistory.length === 0 ? (
              <li key="no-transactions" className="text-gray-500">
                No recent transactions to display.
              </li>
            ) : (
              recentHistory.map((transaction) => (
                <li
                  key={transaction.id}
                  className="border-2 border-secondary rounded-lg px-3 py-4 flex justify-between items-center"
                >
                  <div className="flex gap-x-4">
                    {transaction.type === "income" ? (
                      <Income className="icon-second" />
                    ) : (
                      <Expense className="icon-second" />
                    )}
                    <div>
                      <h5 className="capitalize line">{transaction.title}</h5>
                      <h5 className="font-outfit text-gray-500 capitalize">
                        {transaction.category}
                      </h5>
                    </div>
                  </div>
                  <h5
                    className={`text-xl ${
                      transaction.type === "income"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    ${transaction.amount}
                  </h5>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
