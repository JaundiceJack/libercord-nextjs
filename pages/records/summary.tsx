import type { NextPage } from "next";
import Head from "next/head";
import PageLayout from "../../components/PageLayout";
import SummaryContent from "../../components/pages/Summary";
import useUser from "../../hooks/useUser";

const Summary: NextPage = () => {
  const { user } = useUser({});

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
