import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import cars from "../json/cars.json";
import { formatPrice } from "../utils/formatPrice";
import type { NextPage } from "next";
import CarView from "../components/CarView";
import Layout from "../layout";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <section>
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
      </Layout>
    </>
  );
};

export default Home;
