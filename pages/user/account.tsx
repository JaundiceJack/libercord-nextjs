import type { NextPage } from "next";
import Head from "next/head";
import PageLayout from "../../components/PageLayout";
import useUser from "../../hooks/useUser";

const Account: NextPage = () => {
  const { user } = useUser({});
  return (
    <PageLayout>
      <Head>
        <title>LibreCord - My Account</title>
        <meta name="description" content="Liberty through finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <div />}
    </PageLayout>
  );
};

export default Account;
