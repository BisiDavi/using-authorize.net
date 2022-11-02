import { useForm, FormProvider } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import paymentForm from "../../json/payment-form.json";
import Input from "./Input";
import SelectCountry from "./SelectCountry";
import { paymentSchema } from "./paymentSchema";
import CardForm from "./CardForm";
import Select from "./Select";

export default function PaymentForm() {
  const [formStage, setFormStage] = useState(0);

  console.log("formStage", formStage);

  const methods = useForm({
    resolver: yupResolver(paymentSchema),
    mode: "all",
  });

  function onSubmit(data: any) {
    console.log("data", data);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h4>Make Payment</h4>
        <Link href="/" passHref>
          <button className="go-back bold">Back</button>
        </Link>
        <div className="form-view my-4">
          {formStage < 2
            ? paymentForm[formStage].map((item, index) => (
                <div className="row" key={index}>
                  {item.map((formElement: any) => {
                    const inputClassName = item.length === 2 ? "short" : "long";
                    return (
                      <>
                        {formElement.type === "country" ? (
                          <SelectCountry />
                        ) : formElement.type === "select" ? (
                          <Select
                            input={formElement}
                            className={inputClassName}
                          />
                        ) : (
                          formElement.type !== "select" && (
                            <Input
                              input={formElement}
                              className={inputClassName}
                            />
                          )
                        )}
                      </>
                    );
                  })}
                </div>
              ))
            : formStage === 2 && <CardForm />}
          <div className="buttonSet">
            {formStage > 0 && formStage <= 2 && (
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
            {formStage === 2 && (
              <button className="submit" type="submit">
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
