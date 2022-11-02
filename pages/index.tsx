import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import cars from "../json/cars.json";
import { formatPrice } from "../utils/formatPrice";
import type { NextPage } from "next";
import CarView from "../components/CarView";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <Head>
          <title>
            Buy-Cars | Buy and make recurring payment until the whole payment is
            made
          </title>
        </Head>
        <section>
          <header className="black">
            <h1 className="xxl center">Welcome to Recurring Cars</h1>
          </header>
          <ul className="red">
            How it works: We know that buying of cars can be quite expensive,
            <li>
              1. make an initial deposit of <span className="bold">$5,000</span>
            </li>
            <li>
              2. make recurring payment of <span className="bold">$1,000</span>{" "}
              until the full payment is made
            </li>
          </ul>
          <h6 className="lg center">
            Payment powered by Authorize.net, this is a demo project,solely for
            an upwork job opening
          </h6>
          <p className="red">
            Make payment with{" "}
            <span className="bold">authorize.net test credit card</span>
          </p>
          <CarView />
        </section>
      </main>
      <style jsx>{`
        main {
          background-color: white;
          color: black;
        }
        section {
          margin: 0px 30px;
        }
        ul {
          padding: 0px;
          list-style: none;
        }
      `}</style>
    </>
  );
};

export default Home;
