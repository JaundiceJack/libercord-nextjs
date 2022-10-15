import type { NextPage } from "next";
import Head from "next/head";
import PageLayout from "../../components/pageLayout";
import ExpenseContent from "../../components/expense/expenseContent";
import useUser from "../../hooks/useUser";

const Expense: NextPage = () => {
  const { user } = useUser({});

  return (
    <PageLayout>
      <Head>
        <title>Libercord - Expenses</title>
        <meta name="description" content="Liberty through finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <ExpenseContent />}
    </PageLayout>
  );
};

export default Expense;
