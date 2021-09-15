import "../styles/globals.scss";

import React, { FC } from "react";

import { AppProps } from "next/app";
import { LoginProvider } from "../components/login";
import Page from "./_page";

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <LoginProvider>
    <Page>
      <Component {...pageProps} />
    </Page>
  </LoginProvider>
);

export default App;
