import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import IncomePage from "../../components/pages/Incomes";
import { useReduxDispatch } from "../../hooks/useRedux";
import useUser from "../../hooks/useUser";
import { getInitialCatalog } from "../../redux/catalog";
import { getInitialIncomes } from "../../redux/income";
import { getInitialPreferences } from "../../redux/preferences";

const Income: NextPage = () => {
  const { user } = useUser({});
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(getInitialIncomes());
    dispatch(getInitialPreferences());
    dispatch(getInitialCatalog());
  }, []);

  return (
    <PageLayout>
      <Head>
        <title>LibreCord - Income</title>
        <meta name="description" content="Liberty through finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <IncomePage />}
    </PageLayout>
  );
};

export default Income;
