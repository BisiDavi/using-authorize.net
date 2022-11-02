import Link from "next/link";
import { useState } from "react";

import paymentForm from "../json/payment-form.json";
import Input from "./Input";
import SelectCountry from "./SelectCountry";

export default function PaymentForm() {
  const [formStage, setFormStage] = useState(0);

  return (
    <form>
      <h4>Make Payment</h4>
      <Link href="/" passHref>
        <button>Back</button>
      </Link>
      <div className="form-view my-4">
        {paymentForm[formStage].map((item, index) => (
          <div className="row" key={index}>
            {item.map((formElement, idx) => {
              const inputClassName = item.length === 2 ? "short" : "long";
              return (
                <>
                  {formElement.type === "country" ? (
                    <SelectCountry />
                  ) : formElement.type !== "select" ? (
                    <Input input={formElement} className={inputClassName} />
                  ) : null}
                </>
              );
            })}
          </div>
        ))}
        <div className="buttonSet">
          {formStage > 0 && (
            <button
              className="back"
              type="button"
              onClick={() => setFormStage(formStage - 1)}
            >
              previous
            </button>
          )}
          {formStage < 2 && (
            <button
              className="next"
              type="button"
              onClick={() => setFormStage(formStage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
