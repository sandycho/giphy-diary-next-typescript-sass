import React, { ReactElement } from "react";

import Link from "next/link";

interface Heart {
  title: string;
  leftLink: string;
  leftLabel: string;
}

const Header = ({ title, leftLink, leftLabel }: Heart): ReactElement => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div style={{ fontSize: 28 }}>{title}</div>

    <Link href={leftLink}>
      <a className="app-link">{leftLabel}</a>
    </Link>
  </div>
);

export default Header;
