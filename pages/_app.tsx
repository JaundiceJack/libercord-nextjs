import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import store from "../store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: "light" }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </Provider>
    </>
  );
}

export default MyApp;
