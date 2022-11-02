import Link from "next/link";

import paymentForm from "../json/payment-form.json";
import Input from "./Input";

export default function PaymentForm() {
  return (
    <form>
      <h4>Make Payment</h4>
      <Link href="/" passHref>
        <button>Back</button>
      </Link>
      <div className="form-view my-4">
        {paymentForm[0].map((item, index) => (
          <div className="row" key={index}>
            {item.map((formElement, idx) => {
              const inputClassName = item.length === 2 ? "short" : "long";
              return (
                <>
                  {formElement.type !== "select" && (
                    <Input input={formElement} className={inputClassName} />
                  )}
                </>
              );
            })}
          </div>
        ))}
      </div>
    </form>
  );
}
