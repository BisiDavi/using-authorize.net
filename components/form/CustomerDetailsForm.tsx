import { useForm, FormProvider } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";

import paymentForm from "../../json/payment-form.json";
import Input from "./Input";
import SelectCountry from "./SelectCountry";
import { paymentSchema } from "./paymentSchema";
import Select from "./Select";
import formatPrice from "../../utils/formatPrice";

export default function CustomerDetailsForm({
  formState,
  setFormState,
  numberofOccurence,
}: any) {
  const currentDateInstance = new Date().toISOString().substring(0, 10);
  const methods = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: formState.data,
    mode: "all",
  });

  function onSubmit(data: any) {
    setFormState({
      filled: true,
      data,
    });
  }

  const price = 2000 * numberofOccurence;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="note bg-skyblue">
          <h5>You&#39;re to pay $2,000.00 monthly</h5>
          <h5>
            You will be paying for {numberofOccurence} months for the money to
            be ${formatPrice(price)}
          </h5>
        </div>
        <Link href="/" passHref>
          <button className="go-back bold">Back</button>
        </Link>
        <div className="form-view my-4">
          {paymentForm.map((item, index) => (
            <div className="row" key={index}>
              {item.map((formElement: any) => {
                const inputClassName = item.length === 2 ? "short" : "long";
                return (
                  <>
                    {formElement.type === "country" ? (
                      <SelectCountry />
                    ) : formElement.type === "select" ? (
                      <Select input={formElement} className={inputClassName} />
                    ) : (
                      formElement.type !== "select" && (
                        <Input input={formElement} className={inputClassName} />
                      )
                    )}
                  </>
                );
              })}
            </div>
          ))}
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
