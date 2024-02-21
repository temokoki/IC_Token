import React from "react";
import { AUTH_PRINCIPAL, HANDLEAUTH } from "../index";

export default function Authentication() {
  return (
    <div className="panel">
      <h2>🪪 Authentication</h2>
      <label>
        {AUTH_PRINCIPAL.length > 0
          ? <span>You're logged in as: <span className="principal-text">{AUTH_PRINCIPAL}</span></span>
          : <span>You aren't logged in</span>}
      </label>
      <p style={{ textAlign: 'center' }}>
        <button onClick={HANDLEAUTH}>
          {AUTH_PRINCIPAL.length > 0 ? "Logout" : "Login"}
        </button>
      </p>
    </div >
  );
}