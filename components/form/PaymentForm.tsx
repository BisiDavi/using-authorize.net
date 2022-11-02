import { useState } from "react";

import CardForm from "./CardForm";
import CustomerDetailsForm from "./CustomerDetailsForm";

interface Props {
  numberofOccurence: number;
}

export default function PaymentForm({ numberofOccurence }: Props) {
  const currentDateInstance = new Date().toISOString().substring(0, 10);
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
    },
  });

  console.log("formState", formState);
  const name = `${formState.data.firstName} ${formState.data.lastName}`;

  console.log("name", name);

  return (
    <>
      {!formState.filled ? (
        <CustomerDetailsForm
          formState={formState}
          setFormState={setFormState}
          numberofOccurence={numberofOccurence}
        />
      ) : (
        <CardForm name={name} />
      )}
    </>
  );
}
