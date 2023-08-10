import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import ExpensePage from "../../components/pages/Expenses";
import { useReduxDispatch } from "../../hooks/useRedux";
import useUser from "../../hooks/useUser";
import { getInitialCatalog } from "../../redux/catalog";
import { getInitialExpenses } from "../../redux/expense";
import { getInitialPreferences } from "../../redux/preferences";

const Expense: NextPage = () => {
  const { user } = useUser({});
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(getInitialExpenses());
    dispatch(getInitialPreferences());
    dispatch(getInitialCatalog());
  }, []);

  return (
    <PageLayout>
      <Head>
        <title>LibreCord - Expenses</title>
        <meta name="description" content="Liberty through finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <ExpensePage />}
    </PageLayout>
  );
};

export default Expense;
