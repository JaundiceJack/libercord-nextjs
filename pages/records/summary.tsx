import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import SummaryContent from "../../components/pages/Summary";
import { useReduxDispatch } from "../../hooks/useRedux";
import useUser from "../../hooks/useUser";
import { setTimeframe } from "../../redux/date";
import { getInitialExpenses } from "../../redux/expense";
import { getInitialIncomes } from "../../redux/income";
import { getInitialPreferences } from "../../redux/preferences";
import { getInitialCatalog } from "../../redux/catalog";

const Summary: NextPage = () => {
  const { user } = useUser({});
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(getInitialIncomes());
    dispatch(getInitialExpenses());
    dispatch(getInitialPreferences());
    dispatch(getInitialCatalog());
    dispatch(setTimeframe("year"));
  }, []);

  return (
    <PageLayout>
      <Head>
        <title>LibreCord - Summary</title>
        <meta name="description" content="Liberty through finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <SummaryContent />}
    </PageLayout>
  );
};

export default Summary;
