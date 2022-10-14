import type { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import PageLayout from "../components/pageLayout";
import HomeContent from "../components/home/homeContent";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Libercord - Home</title>
        <meta name="description" content="Liberty through finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContent />
    </PageLayout>
  );
};

export default Home;
