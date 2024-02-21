import React, { useState } from "react";
import { Principal } from '@dfinity/principal';
import { IC_Token_backend } from "../../../declarations/IC_Token_backend";

export default function Balance() {
  const [inputValue, setInput] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [tokenSymbol, setSymbol] = useState("");
  const [isFeedbackHidden, setFeedbackHidden] = useState(true);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  async function handleClick() {
    try {
      Principal.fromText(inputValue);
    } catch (error) {
      alert(error);
      return;
    }

    setButtonDisabled(true);
    const principal = Principal.fromText(inputValue);
    const balance = await IC_Token_backend.checkBalance(principal);
    setBalance(balance.toLocaleString());
    setSymbol(await IC_Token_backend.getSymbol());
    setFeedbackHidden(false);
    setButtonDisabled(false);
  }

  return (
    <div className="panel">
      <h2>🔍 Balance</h2>
      <label>Check account token balance</label>
      <p>
        <input
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      <p style={{ textAlign: 'center' }} >
        <button
          onClick={handleClick}
          disabled={isButtonDisabled}
        >
          Check
        </button>
      </p>
      <p className="feedback-text" hidden={isFeedbackHidden}>This account has a balance of {balanceResult} {tokenSymbol}</p>
    </div>
  );
}