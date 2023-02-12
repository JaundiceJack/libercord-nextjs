import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import ExpensePage from "../../components/pages/Expenses";
import { useReduxDispatch } from "../../hooks/useRedux";
import useUser from "../../hooks/useUser";
import { getInitialCatalog } from "../../redux/catalogSlice";
import { getInitialExpenses } from "../../redux/expenseSlice";

const Expense: NextPage = () => {
  const { user } = useUser({});
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(getInitialExpenses());
    dispatch(getInitialCatalog());
  }, []);

  return (
    <PageLayout>
      <Head>
        <title>Libercord - Expenses</title>
        <meta name="description" content="Liberty through finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <ExpensePage />}
    </PageLayout>
  );
};

export default Expense;
