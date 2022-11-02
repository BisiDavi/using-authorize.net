import Cards from "react-credit-cards-2";
import { useState } from "react";

import { formStateType } from "../../types";
import "react-credit-cards-2/es/styles-compiled.css";

const formArray = [
  { name: "number", text: "Card Number" },
  { name: "expiry", text: "Expiry" },
  { name: "cvc", text: "CVC" },
];

interface Props {
  userDetails: formStateType;
}

export default function CardForm({ userDetails }: Props) {
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

  function onSubmit(e: any) {
    e.preventDefault();
    const data = {
      ...userDetails,
      formState,
    };
    console.log("data", data);
  }

  return (
    <div id="PaymentForm">
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
    </div>
  );
}
