import React, { useState } from "react";
import { AUTH_ACTOR } from "../index";

export default function Faucet() {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Get Free Tokens");

  async function handleButtonClick() {
    setButtonDisabled(true);
    const result = await AUTH_ACTOR.getFreeTokens();
    setButtonText(result);
  }

  return (
    <div className="panel">
      <h2>🚰 Faucet</h2>
      <label>Claim 100 SMPL tokens!</label>
      <p style={{ textAlign: 'center' }}>
        <button
          onClick={handleButtonClick}
          disabled={isButtonDisabled}
        >
          {buttonText}
        </button>
      </p>
    </div>
  );
}