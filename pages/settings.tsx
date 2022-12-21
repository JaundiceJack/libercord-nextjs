import type { NextPage } from "next";
import Head from "next/head";
import PageLayout from "../components/pageLayout";
import SettingsContent from "../components/settings/settingsContent";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import { useReduxDispatch } from "../hooks/useRedux";
import { getInitialCatalog } from "../redux/catalogSlice";

const Settings: NextPage = () => {
  const { user } = useUser({});
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(getInitialCatalog());
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
