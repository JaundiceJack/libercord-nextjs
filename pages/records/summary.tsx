import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import SummaryContent from "../../components/pages/Summary";
import { useReduxDispatch } from "../../hooks/useRedux";
import useUser from "../../hooks/useUser";
import { setTimeframe } from "../../redux/dateSlice";
import { getInitialExpenses } from "../../redux/expenseSlice";
import { getInitialIncomes } from "../../redux/incomeSlice";

const Summary: NextPage = () => {
  const { user } = useUser({});
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(getInitialIncomes());
    dispatch(getInitialExpenses());
    dispatch(setTimeframe("year"));
  }, []);

  return (
    <PageLayout>
      <Head>
        <title>Libercord - Summary</title>
        <meta name="description" content="Liberty through finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <SummaryContent />}
    </PageLayout>
  );
};

export default Summary;
