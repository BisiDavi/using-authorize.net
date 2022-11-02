/* eslint-disable @next/next/no-img-element */
import Cards from "react-credit-cards-2";
import { useState } from "react";

import { formStateType } from "../../types";
import "react-credit-cards-2/es/styles-compiled.css";
import axios from "axios";
import SpinnerRipple from "../SpinnerRipple";

const formArray = [
  { name: "number", text: "Card Number" },
  { name: "expiry", text: "Expiry" },
  { name: "cvc", text: "CVC" },
];

interface Props {
  userDetails: formStateType;
}

export default function CardForm({ userDetails }: Props) {
  const [formStatus, setFormStatus] = useState<
    null | "loading" | "success" | "error"
  >(null);
  const name = `${userDetails.firstName} ${userDetails.lastName}`;
  const [formState, setFormState] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name,
    cardNumber: "",
  });

  function handleInputFocus(e: any) {
    setFormState({ ...formState, focus: e.target.name });
  }

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  async function onSubmit(e: any) {
    e.preventDefault();
    const data = {
      ...userDetails,
      ...formState,
      description: `This car was ${userDetails.carName} purchased by ${name} `,
    };

    console.log("data", data);
    setFormStatus("loading");
    await axios
      .post("/api/create-subscription", { data })
      .then((response) => {
        setFormStatus("success");
        console.log("response-from-create-subscription-api", response);
      })
      .catch((error) => {
        setFormStatus("error");
        console.log("error-from-create-subscription-api", error);
      });
  }

  return (
    <div id="PaymentForm">
      {null ? (
        <>
          <Cards
            cvc={formState.cvc}
            expiry={formState.expiry}
            focused={formState.focus}
            name={formState.name}
            number={formState.cardNumber}
          />
          <form onSubmit={onSubmit}>
            <div className="input-group">
              {formArray.map((input, index) => (
                <input
                  key={index}
                  type="tel"
                  name={input.name}
                  placeholder={input.text}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              ))}
            </div>
            <button className="submit" type="submit">
              Submit
            </button>
          </form>
          <p className="red bold">
            To get card number visit this link
            <a
              target="_blank"
              rel="noreferrer"
              href="https://developer.authorize.net/hello_world/testing_guide.html"
            >
              Check here
            </a>
          </p>
        </>
      ) : formStatus === "loading" ? (
        <SpinnerRipple />
      ) : formStatus === "success" ? (
        <>
          <img src="/checkmark.gif" alt="successful" />
          <h4>Payment Successful</h4>
        </>
      ) : (
        formStatus === "error" && (
          <>
            <img src="/error.gif" alt="error" />
            <h4>Error making payment</h4>
          </>
        )
      )}
    </div>
  );
}
