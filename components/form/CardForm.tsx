/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Cards from "react-credit-cards-2";
import { useState } from "react";
import axios from "axios";

import { formStateType } from "../../types";
import "react-credit-cards-2/es/styles-compiled.css";
import SpinnerRipple from "../SpinnerRipple";

const formArray = [
  { name: "number", text: "Card Number" },
  { name: "expiry", text: "Expiry (MM/YY)" },
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
    number: "",
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
      cardNumber: formState.number,
      description: `This car was ${userDetails.carName} purchased by ${name} `,
    };
    setFormStatus("loading");
    return await axios
      .post(
        "/api/create-subscription",
        { data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.messages.resultCode !== "Error") {
          setFormStatus("success");
        } else if (response.data.messages.resultCode === "Error") {
          setFormStatus("error");
        }
        console.log("response-from-create-subscription-api", response);
      })
      .catch((error) => {
        setFormStatus("error");
        console.log("error-from-create-subscription-api", error);
      });
  }

  return (
    <div id="PaymentForm">
      {formStatus === null ? (
        <>
          <Cards
            cvc={formState.cvc}
            expiry={formState.expiry}
            focused={formState.focus}
            name={formState.name}
            number={formState.number}
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
                  required
                />
              ))}
            </div>
            <button className="submit">Submit</button>
          </form>
          <p>use any future date as expiry date</p>
          <p className="bold">
            To get card number
            <a
              className="red"
              target="_blank"
              rel="noreferrer"
              href="https://developer.authorize.net/hello_world/testing_guide.html"
            >
              {" "}
              Check here
            </a>
          </p>
        </>
      ) : formStatus === "loading" ? (
        <SpinnerRipple centerRipple />
      ) : formStatus === "success" ? (
        <>
          <img src="/checkmark.gif" alt="successful" />
          <h4>Payment Successful </h4>
          <button>View List of All Subscription</button>
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
