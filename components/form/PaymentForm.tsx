import { useState } from "react";

import CardForm from "./CardForm";
import CustomerDetailsForm from "./CustomerDetailsForm";

export default function PaymentForm() {
  const [formStage, setFormStage] = useState(0);

  console.log("formStage", formStage);

  return (
    <>
      {formStage < 2 ? (
        <CustomerDetailsForm
          formStage={formStage}
          setFormStage={setFormStage}
        />
      ) : (
        formStage === 2 && <CardForm />
      )}
    </>
  );
}
