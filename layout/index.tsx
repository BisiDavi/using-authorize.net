import Head from "next/head";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Head>
        <title>
          Buy-Cars | Buy and make recurring payment until the whole payment is
          made
        </title>
      </Head>
      <header>
        <h1 className="xxl center">Welcome to Recurring Cars</h1>
      </header>
      <main>{children}</main>
      <footer>© Olubisi David, 2022</footer>
      <style jsx>{`
        header {
          background-color: black;
          color: white;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        main {
          background-color: white;
          color: black;
          margin: 0px 30px;
        }
        footer {
          background-color: gray;
          padding: 10px 30px;
          height: 50px;
          color: white;
          font-weight: bold;
        }
      `}</style>
    </>
  );
}
