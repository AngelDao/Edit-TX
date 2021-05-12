import React, { useState } from "react";
import { ethers } from "ethers";

const TXForm = ({ type, wallet, provider }) => {
  const [form, setForm] = useState({ nonce: "", gas: "", hash: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [warn, setWarn] = useState(false);

  const handleSubmit = async (e) => {
    setError("");
    setSent("");
    setWarn("");
    e.preventDefault();
    const nonce = parseInt(form.nonce);
    const gas = form.gas;
    const hash = form.hash;

    if (!gas) {
      setError("gas needs to be entered");
      return;
    }
    // if (type === "cancel" && !nonce) {
    //   setError("nonce needs to be entered");
    //   return;
    // }

    if (type === "speed" && !hash) {
      setError("hash needs to be entered");
      return;
    }

    let transaction;

    transaction = {
      to: wallet.address,
      value: ethers.utils.parseEther("0"),
      nonce: nonce,
      gasPrice: gas * 1000000000,
    };

    //   const tx = await provider.send("eth_newPendingTransactionFilter", []);
    const expectedNonce = await provider.getTransactionCount(
      wallet.address,
      "pending"
    );

    if (nonce > expectedNonce) {
      setError(
        `Nonce entered is above the range, your expected nonce is ${expectedNonce}`
      );
      return;
    }

    if (nonce < expectedNonce - 2) {
      setWarn(
        `Nonce entered is below the range, check your tx on etherscan it might have already been mined, expected nonce is ${expectedNonce}`
      );
    }
    //   const block = await provider.getBlockWithTransactions("pending");
    //   const mempool = await block.transactions;
    const tx = await provider.getTransaction(hash);

    if (!tx) {
      setError(
        `Not able to find details on tx, gas price is too low or it has not been indexed yet, if this persists you should prob just cancel it`
      );
      return;
    }
    const est = await provider.estimateGas(transaction);
    const safeGas = parseInt(est) * 1.05;

    //   transaction.gasLimit = safeGas;
    transaction.value = ethers.utils.parseEther(tx.value.toString());
    transaction.nonce = tx.nonce;
    if (type === "speed") {
      transaction.to = tx.to;
    }

    try {
      await wallet.sendTransaction(transaction);
      setSent("It is sent");
    } catch (err) {
      debugger;
      setError("transaction failed");
    }
  };

  const typeMap = {
    speed: "💨 Speed Up TX",
    cancel: "❌ Cancel TX",
  };

  const handleChange = (key, e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  return (
    <div
      style={{
        marginTop: "35px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: "24px" }}>{typeMap[type]}</span>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          marginTop: "25px",
        }}
      >
        <>
          <span style={{ marginBottom: "7.5px" }}>Pending TX Hash</span>
          <input
            onChange={(e) => handleChange("hash", e)}
            value={form.hash}
            placeholder="Enter Hash"
          ></input>{" "}
        </>
        {type === "poop" && (
          <>
            <span
              style={{
                marginTop: type === "speed" && "15px",
                marginBottom: "7.5px",
              }}
            >
              Pending TX Nonce
            </span>
            <input
              onChange={(e) => handleChange("nonce", e)}
              value={form.nonce}
              placeholder="Enter Nonce"
            ></input>
          </>
        )}
        <span style={{ marginTop: "15px", marginBottom: "7.5px" }}>
          Gas Price (GWEI){" "}
          <a
            href="https://www.ethgasstation.info"
            target="_blank"
            rel="noreferrer"
          >
            Check here for recomendation
          </a>
        </span>
        <input
          onChange={(e) => handleChange("gas", e)}
          value={form.gas}
          placeholder="Enter Gas Price"
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
            💱 Send
          </button>
        </div>
      </form>
      {error && (
        <span style={{ marginTop: "25px", color: "red" }}>{error}</span>
      )}
      {sent && (
        <span style={{ marginTop: "25px", color: "green" }}>{sent}</span>
      )}
      {warn && (
        <span style={{ marginTop: "25px", color: "orange" }}>{warn}</span>
      )}
    </div>
  );
};

export default TXForm;
