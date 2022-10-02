import type { NextPage } from "next";
import Head from "next/head";
import PageLayout from "../../components/pageLayout";
import ExpenseContent from "../../components/expense/expenseContent";

const Expense: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Libercord - Expenses</title>
        <meta name="description" content="Liberty through finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ExpenseContent />
    </PageLayout>
  );
};

export default Expense;
