import "../styles/globals.css";

import React, { FC } from "react";

import { AppProps } from "next/app";
import { LoginProvider } from "../components/login";

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <LoginProvider>
    <Component {...pageProps} />
  </LoginProvider>
);

export default App;
