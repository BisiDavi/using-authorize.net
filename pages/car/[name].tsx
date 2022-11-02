import { useRouter } from "next/router";

import Layout from "../../layout";
import cars from "../../json/cars.json";
import toSlug from "../../utils/toSlug";
import CarDetailsView from "../../components/CarDetailsView";
import PaymentForm from "../../components/form/PaymentForm";

export default function Car() {
  const router = useRouter();
  const { name } = router.query;

  const car = cars.filter((item) => name === toSlug(item?.name))[0];

  const numberofOccurence = car ? car?.price / 2000 : 0;

  return (
    <Layout>
      {name && (
        <section>
          <CarDetailsView car={car} />
          <PaymentForm numberofOccurence={numberofOccurence} />
        </section>
      )}
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
