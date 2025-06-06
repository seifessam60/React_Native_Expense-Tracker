import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const [error, setError] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const expensesCtx = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  if (error && !isFetching) {
    return <ErrorOverlay message={error}/>;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <ExpensesOutput
      expesesPeriod={"Last 7 days"}
      expenses={recentExpenses}
      fallbackText={"No expenses registered for the last 7 days."}
    />
  );
};

export default RecentExpenses;
