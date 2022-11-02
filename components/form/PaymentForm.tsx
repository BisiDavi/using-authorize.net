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

  return (
    <>
      {!formState.filled ? (
        <CustomerDetailsForm
          formState={formState}
          setFormState={setFormState}
          numberofOccurence={numberofOccurence}
        />
      ) : (
        <CardForm userDetails={formState.data} />
      )}
    </>
  );
}
