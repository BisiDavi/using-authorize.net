import formatPrice from "../utils/formatPrice";

export default function SubscriptionTable({ subscriptions }) {
  return (
    <table>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Name</th>
          <th>User</th>
          <th>Occurences</th>
          <th>Payment Method</th>
          <th>Amount</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {subscriptions.map((subscription, index: number) => {
          const idx = index + 1;
          const date = new Date(subscription.createTimeStampUTC).toDateString();
          return (
            <tr key={subscription.id}>
              <td>{idx}</td>
              <td>{subscription.name}</td>
              <td>
                {subscription.firstName} {subscription.lastName}
              </td>
              <td>
                <p>Total Occurrences: {subscription.totalOccurrences} </p>
                <p>Past Occurrences: {subscription.pastOccurrences} </p>
              </td>
              <td>{subscription.paymentMethod}</td>
              <td>${formatPrice(subscription.amount)}</td>
              <td>
                <p>Customer Profile id: {subscription.customerProfileId}</p>
                <p>
                  Customer Payment Profile Id:{" "}
                  {subscription.customerPaymentProfileId}
                </p>
                <p>
                  Customer Shipping Profile Id:{" "}
                  {subscription.customerShippingProfileId}
                </p>
              </td>
              <td>{subscription.status}</td>
              <td>{date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
