import Image from "next/image";
import Link from "next/link";

import cars from "../json/cars.json";
import { formatPrice } from "../utils/formatPrice";

export default function CarView() {
  return (
    <>
      <ul className="cars-grid">
        {cars.map((item, index) => (
          <li key={index} className="car-list">
            <Link href={`/car/${item.name}`} passHref>
              <a>
                <div className="overlay">
                  <button>Buy</button>
                </div>
                <Image
                  src={item.image}
                  alt={item.name}
                  height={400}
                  width={700}
                  layout="responsive"
                />
                <h4 className="xl my-4">{item.name}</h4>
                <button>${formatPrice(item.price)}</button>
              </a>
            </Link>
          </li>
        ))}
      </ul>
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
        .car-list {
          position: relative;
        }

        .car-list:hover .overlay {
          display: flex;
          margin: auto;
          align-items: center;
          justify-content: center;
        }

        .car-list:hover .overlay button {
          z-index: 3;
          opacity: 1;
        }
        .overlay {
          display: none;
          background-color: white;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          height: 100%;
          width: 100%;
          opacity: 0.8;
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
}
