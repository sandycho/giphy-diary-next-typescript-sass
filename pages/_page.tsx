import React, { FC } from "react";

import { AppProps } from "next/app";
import styles from "../styles/_Page.module.css";

const Page: FC<AppProps> = ({ children }) => (
  <div className={styles.page}>{children}</div>
);

export default Page;
