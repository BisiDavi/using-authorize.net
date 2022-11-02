import Cards from "react-credit-cards-2";
import { useState } from "react";
import "react-credit-cards-2/es/styles-compiled.css";

const formArray = [
  { name: "number", text: "Card Number" },
  { name: "expiry", text: "Expiry" },
  { name: "cvc", text: "CVC" },
];

export default function CardForm() {
  const [formState, setFormState] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    number: "",
    name: "",
  });

  function handleInputFocus(e: any) {
    setFormState({ ...formState, focus: e.target.name });
  }

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  return (
    <div id="PaymentForm">
      <Cards
        cvc={formState.cvc}
        expiry={formState.expiry}
        focused={formState.focus}
        number={formState.number}
      />
      <form>
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
      </form>
    </div>
  );
}
