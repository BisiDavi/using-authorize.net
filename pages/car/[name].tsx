import { useRouter } from "next/router";

import Layout from "../../layout";
import cars from "../../json/cars.json";
import toSlug from "../../utils/toSlug";
import Image from "next/image";
import Link from "next/link";
import CarDetailsView from "../../components/CarDetailsView";

export default function Car() {
  const router = useRouter();
  const { name } = router.query;

  const car = cars.filter((item) => name === toSlug(item.name))[0];

  console.log("car", car);

  return (
    <Layout>
      <section>
        <CarDetailsView car={car} />
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
