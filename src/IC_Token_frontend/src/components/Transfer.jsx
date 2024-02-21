import React, { useState } from "react";
import { Principal } from '@dfinity/principal';
import { AUTH_ACTOR } from "../index";

export default function Transfer() {
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isFeedbackHidden, setFeedbackHidden] = useState(true);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  async function handleClick() {
    try {
      Principal.fromText(recipientId);
    } catch (error) {
      alert(error);
      return;
    }

    setFeedbackHidden(true);
    setButtonDisabled(true);

    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);
    const result = await AUTH_ACTOR.transfer(recipient, amountToTransfer);

    setFeedback(result);
    setFeedbackHidden(false);
    setButtonDisabled(false);
  }

  return (
    <div className="panel">
      <h2>💶 Transfer</h2>
      <div className="transferPanel">
        <fieldset>
          <legend>Recipient Principal:</legend>
          <input
            type="text"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value < 0 ? 0 : e.target.value)}
          />
        </fieldset>
      </div>
      <p style={{ textAlign: 'center' }}>
        <button
          id="btn-transfer"
          onClick={handleClick}
          disabled={isButtonDisabled}
        >
          Transfer
        </button>
      </p>
      <p className="feedback-text" hidden={isFeedbackHidden}>{feedback}</p>
    </div>
  );
}