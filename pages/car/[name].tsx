import { useRouter } from "next/router";

import Layout from "../../layout";
import cars from "../../json/cars.json";
import toSlug from "../../utils/toSlug";
import Image from "next/image";
import Link from "next/link";

export default function Car() {
  const router = useRouter();
  const { name } = router.query;

  const car = cars.filter((item) => name === toSlug(item.name))[0];

  console.log("car", car);

  return (
    <Layout>
      <section>
        <div className="car-details">
          <Image
            alt={car.name}
            src={car.image}
            height={600}
            width={1000}
            layout="responsive"
          />
          <h4>{car.name}</h4>
        </div>
        <form>
          <h4>Make Payment</h4>
          <Link href="/" passHref>
            <button>Back</button>
          </Link>
        </form>
      </section>
      <style jsx>
        {`
          section {
            display: grid;
            grid-template-columns: 2fr 1fr;
            grid-gap: 20px;
          }
        `}
      </style>
    </Layout>
  );
}
