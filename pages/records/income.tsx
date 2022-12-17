import type { NextPage } from "next";
import Head from "next/head";
import PageLayout from "../../components/pageLayout";
import IncomeContent from "../../components/income/incomeContent";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";
import { useReduxDispatch } from "../../hooks/useRedux";
import { getInitialIncomes } from "../../redux/incomeSlice";
import { getInitialCatalog } from "../../redux/catalogSlice";

const Income: NextPage = () => {
  const { user } = useUser({});
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(getInitialIncomes());
    dispatch(getInitialCatalog());
  }, []);

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
