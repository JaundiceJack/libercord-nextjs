import type { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import PageLayout from "../components/PageLayout";
import HomeContent from "../components/pages/Home";

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
