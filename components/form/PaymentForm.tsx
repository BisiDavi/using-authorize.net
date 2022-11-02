import { useState } from "react";

import CardForm from "./CardForm";
import CustomerDetailsForm from "./CustomerDetailsForm";

interface Props {
  numberofOccurence: number;
}

export default function PaymentForm({ numberofOccurence }: Props) {
  const [formStage, setFormStage] = useState(0);

  console.log("formStage", formStage);

  return (
    <>
      {formStage < 2 ? (
        <CustomerDetailsForm
          formStage={formStage}
          setFormStage={setFormStage}
          numberofOccurence={numberofOccurence}
        />
      ) : (
        formStage === 2 && <CardForm />
      )}
    </>
  );
}
