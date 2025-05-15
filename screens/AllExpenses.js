import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expesesPeriod={"Total"}
      expenses={expensesCtx.expenses}
      fallbackText={"No expenses registered yet."}
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
