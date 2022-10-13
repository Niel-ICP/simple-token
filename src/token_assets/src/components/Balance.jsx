import React, { useState } from "react";
import {Principal} from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {

  const [inputValue, setInputValue] = useState("");
  const [balance, setBalance] = useState("");
  const [symbol, setSymbol] = useState("");
  
  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    console.log(inputValue);
    const _b = (await token.balanceOf(principal));
    setBalance(_b.toLocaleString());
    console.log(_b.toLocaleString());
    setSymbol(await token.getSymbol());
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => {setInputValue(e.target.value)}}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p style={balance == "" ? {visibility: "hidden"}: {visibility: "visible"}}>This account has a balance of {balance} {symbol}</p>
    </div>
  );
}

export default Balance;
