import type { NextPage } from "next";
import Head from "next/head";
import PageLayout from "../../components/pageLayout";
import IncomeContent from "../../components/income/incomeContent";
import useUser from "../../hooks/useUser";

const Income: NextPage = () => {
  const { user } = useUser({});

  return (
    <PageLayout>
      <Head>
        <title>Libercord - Income</title>
        <meta name="description" content="Liberty through finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <IncomeContent />}
    </PageLayout>
  );
};

export default Income;
