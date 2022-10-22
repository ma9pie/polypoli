import Head from "next/head";
import React from "react";

function Header(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content="폴리폴리" />
    </Head>
  );
}

export default Header;

Header.defaultProps = {
  title: "폴리폴리",
};
