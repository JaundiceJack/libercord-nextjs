import type { NextPage } from "next";
import Head from "next/head";
import PageLayout from "../../components/PageLayout";
import IncomePage from "../../components/pages/Incomes";
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
      {user && <IncomePage />}
    </PageLayout>
  );
};

export default Income;
