import React, { useState } from "react";
import {token} from "../../../declarations/token";
import {Principal} from "@dfinity/principal";

function Transfer() {

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [feedback, setFeedback] = useState("");
  
  async function handleClick() {
    const principal = Principal.fromText(to);
    setDisabled(true);
    setFeedback(await token.transfer(principal, parseInt(amount)));
    setHidden(false);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                onChange={(e) => {setTo(e.target.value)}}
                value={to}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                onChange={(e) => {setAmount(e.target.value)}}
                value={amount}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button disabled={disabled} id="btn-transfer" onClick={handleClick} >
            Transfer
          </button>
        </p>
        <p hidden={hidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
