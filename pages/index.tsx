import type { NextPage } from "next";
import CarView from "../components/CarView";
import SiteInfo from "../components/SiteInfo";
import Layout from "../layout";

const Home: NextPage = () => {
  return (
      <Layout>
        <section>
          <SiteInfo />
          <CarView />
        </section>
      </Layout>
  );
};

export default Home;
