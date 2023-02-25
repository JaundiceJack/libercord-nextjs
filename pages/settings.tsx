import type { NextPage } from "next";
import Head from "next/head";
import PageLayout from "../components/PageLayout";
import SettingsContent from "../components/pages/Settings";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import { useReduxDispatch } from "../hooks/useRedux";
import { getInitialCatalog } from "../redux/catalog";
import { getInitialPreferences } from "../redux/preferences";

const Settings: NextPage = () => {
  const { user } = useUser({});
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(getInitialCatalog());
    dispatch(getInitialPreferences());
  }, []);

  return (
    <PageLayout>
      <Head>
        <title>Libercord - Catalog Management</title>
        <meta name="description" content="Liberty through finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <SettingsContent />}
    </PageLayout>
  );
};

export default Settings;
