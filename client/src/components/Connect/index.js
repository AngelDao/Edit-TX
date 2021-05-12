import React, { useState } from "react";
import { ethers } from "ethers";

const Connect = ({ setWallet, setCon, provider }) => {
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e, b, v) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const pw = e.target[0].value.trim();
    const isMnem = pw.includes(" ");

    let wallet;
    if (isMnem) {
      try {
        wallet = ethers.Wallet.fromMnemonic(pw);
        wallet.connect(provider);
      } catch (err) {
        console.log(err);
        setErr(err);
      }
    } else {
      try {
        wallet = new ethers.Wallet(pw, provider);
      } catch (err) {
        console.log(err);
        setErr(err);
      }
    }

    if (wallet) {
      console.log(wallet.address);
      setWallet(wallet);
      setCon(true);
    } else {
      setErr("No wallet exists");
    }
  };

  const handleFocus = () => {
    if (value === "PK or Seed Phrase") {
      // setValue("");
    }
  };

  const handleBlur = () => {
    if (value === "") {
      // setValue("PK or Seed Phrase");
    }
  };

  const handleChange = (e, g, v, c) => {
    setValue(e.target.value);
  };
  return (
    <div
      style={{
        width: "450px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "25px",
      }}
    >
      <span style={{ fontSize: "22px", marginBottom: "25px" }}>
        Connect Wallet
      </span>
      <span>{err}</span>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          style={{ width: "100%" }}
          value={value}
          placeholder="PK or Mnemonic"
          name="key"
        ></input>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "25px",
          }}
        >
          <button style={{ fontWeight: "bold" }} type="submit">
            🌐 Connect
          </button>
        </div>
      </form>
    </div>
  );
};

export default Connect;
