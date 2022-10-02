import type { NextPage } from "next";
import Head from "next/head";
import PageLayout from "../../components/pageLayout";
import SummaryContent from "../../components/summary/summaryContent";

const Summary: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Libercord - Summary</title>
        <meta name="description" content="Liberty through finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SummaryContent />
    </PageLayout>
  );
};

export default Summary;
