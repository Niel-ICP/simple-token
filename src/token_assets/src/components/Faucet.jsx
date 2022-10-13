import React, {useState} from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";

function Faucet() {

  const [faucetUsed, setUsed] = useState(false);
  const [faucetText, setText] = useState("Gib tokens!");

  async function handleClick(event) {
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {identity,},
    })
    const _text = await authenticatedCanister.mint10k();
    setText(_text);
    setUsed(true);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" disabled={faucetUsed} onClick={handleClick}>{faucetText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
