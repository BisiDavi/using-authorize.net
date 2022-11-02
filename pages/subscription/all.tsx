/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import SpinnerRipple from "../../components/SpinnerRipple";
import SubscriptionTable from "../../components/SubscriptionTable";

import Layout from "../../layout";
import getAllSubscription from "../../request/getAllSubscription";

export default function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState(null);
  const [status, setStatus] = useState<null | "loading" | "success" | "error">(
    null
  );

  console.log("subscription", subscriptions);

  useEffect(() => {
    setStatus("loading");
    getAllSubscription()
      .then((response) => {
        console.log(response.data);
        if (response.data.messages.resultCode !== "Error") {
          setStatus("success");
          setSubscriptions(
            response.data?.subscriptionDetails.subscriptionDetail
          );
        } else if (response.data.messages.resultCode === "Error") {
          setStatus("error");
        }
      })
      .catch((error) => {
        setStatus("error");
      });
  }, []);
  return (
    <Layout>
      <section className="flex flex-direction items-center justify-center">
        <h1>View Active Subscriptions</h1>
        {status === "error" ? (
          <>
            <img src="error.gif" alt="error" />
            <h4>Error fetching subscriptions</h4>
          </>
        ) : status === "loading" ? (
          <SpinnerRipple centerRipple />
        ) : (
          status === "success" && (
            <>
              <h4>Fetching subscription successful</h4>
              {subscriptions !== null && (
                <SubscriptionTable subscriptions={subscriptions} />
              )}
            </>
          )
        )}
      </section>
    </Layout>
  );
}
