import type { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import PageLayout from "../components/PageLayout";
import HomeContent from "../components/pages/Home";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>LibreCord - Home</title>
        <meta name="description" content="Your finances, simplified." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContent />
    </PageLayout>
  );
};

export default Home;
