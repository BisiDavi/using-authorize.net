import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import cars from "../json/cars.json";
import { formatPrice } from "../utils/formatPrice";

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
          <h1 className="xxl center">Welcome to Recurring Cars</h1>
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
          <ul className="cars-grid">
            {cars.map((item, index) => (
              <li key={index} className="car-list">
                <Image
                  src={item.image}
                  alt={item.name}
                  height={400}
                  width={700}
                  layout="responsive"
                />
                <h4 className="xl my-4">{item.name}</h4>
                <button>${formatPrice(item.price)}</button>
              </li>
            ))}
          </ul>
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
        .cars-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 30px;
          background-color: white;
          color: black;
        }
        .car-list button {
          background-color: green;
          border: none;
          font-size: 20px;
          font-weight: bold;
          padding: 5px 20px;
          border-radius: 5px;
        }
        .car-list button:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  );
};

export default Home;
