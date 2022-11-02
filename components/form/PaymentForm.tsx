import { useState } from "react";

import CardForm from "./CardForm";
import CustomerDetailsForm from "./CustomerDetailsForm";

interface Props {
  car: {
    name: string;
    image: string;
    price: number;
  };
}

export default function PaymentForm({ car }: Props) {
  const currentDateInstance = new Date().toISOString().substring(0, 10);
  const numberofOccurence = car ? car?.price / 2000 : 0;

  const [formState, setFormState] = useState({
    filled: false,
    data: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      paymentStartDate: currentDateInstance,
      numberofOccurence,
      amount: car.price,
      carName: car.name,
      title: `${car.name} purchased`,
    },
  });
  console.log("formState.data", formState.data);
  return (
    <>
      {!formState.filled ? (
        <CustomerDetailsForm
          formState={formState}
          setFormState={setFormState}
        />
      ) : (
        <CardForm userDetails={formState.data} />
      )}
    </>
  );
}
