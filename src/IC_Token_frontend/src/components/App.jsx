import React from "react";
import Header from "./Header";
import Authentication from "./Authentication";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";
import { AUTH_PRINCIPAL } from "../index";

export default function App() {
  if (AUTH_PRINCIPAL.length <= 0) {
    return (
      <div>
        <Header />
        <Authentication />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <Authentication />
        <Faucet />
        <Balance />
        <Transfer />
      </div>
    );
  }
}