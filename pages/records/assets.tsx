import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import AssetsPage from "../../components/pages/Assets";
import { useReduxDispatch } from "../../hooks/useRedux";
import useUser from "../../hooks/useUser";
import { getInitialCatalog } from "../../redux/catalog";
import { getInitialAssets } from "../../redux/asset";
import { getInitialPreferences } from "../../redux/preferences";

const Assets: NextPage = () => {
  const { user } = useUser({});
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(getInitialAssets());
    dispatch(getInitialPreferences());
    dispatch(getInitialCatalog());
  }, []);

  return (
    <PageLayout>
      <Head>
        <title>LibreCord - Assets</title>
        <meta name="description" content="Liberty through finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <AssetsPage />}
    </PageLayout>
  );
};

export default Assets;
