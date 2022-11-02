import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import cars from "../json/cars.json";

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
        <section className="cars-grid">
          <h1 className="xxl center">Welcome to Recurring Cars</h1>
          <h6 className="lg center">Payment powered by Authorize.net</h6>
          <ul>
            {cars.map((item, index) => (
              <li key={index} className="car-list">
                <Image
                  src={item.image}
                  alt={item.name}
                  height={400}
                  width={700}
                  layout="responsive"
                />
                <h4>{item.name}</h4>
                <p>{item.price}</p>
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
        .cars-grid ul {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 30px;
          margin: 0px 30px;
          list-style: none;
          background-color: white;
          color: black;
          padding: 0px;
        }
        .cars-grid li {
        }
      `}</style>
    </>
  );
};

export default Home;
