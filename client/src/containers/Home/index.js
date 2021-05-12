import React, { useState, useEffect } from "react";
import { Container, MenuItem } from "./styles";
import Connect from "../../components/Connect";
import TXForm from "../../components/TXForm";
import { ethers } from "ethers";
import { providerEvents } from "../../utils/handleEvents";

const Home = ({ conState }) => {
  const [con, setCon] = conState;
  const [wallet, setWallet] = useState(null);
  const [selected, setSelected] = useState("cancel");
  const [hovered, setHovered] = useState(null);
  const [provider, setProv] = useState(null);

  const handleClick = (e) => {
    console.log(e);
    setSelected(e);
  };

  const handleHover = (e) => {
    setHovered(e);
  };

  const handleExit = () => {
    setHovered(null);
  };

  useEffect(() => {
    (async () => {
      if (!provider) {
        const { REACT_APP_INFURA, REACT_APP_INFURA_KOVAN } = process.env;
        const prov = new ethers.providers.InfuraProvider(
          "kovan",
          REACT_APP_INFURA_KOVAN
        );
        const block = await prov.getBlock(-1);
        setProv(prov);
        providerEvents(prov);
        let bk;
        try {
          bk = await prov.getBlock("pending");
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [provider]);

  return (
    <Container
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      <span style={{ fontSize: "36px", marginTop: "25px" }}>📝 Edit TX</span>
      <hr
        style={{
          width: "100%",
          border: "none",
          borderBottom: "dotted 5px black",
          height: "0px",
          marginTop: "25px",
        }}
      ></hr>
      {wallet && wallet.address ? (
        <>
          <div
            style={{
              marginTop: "25px",
              marginBottom: "12.5px",
              display: "flex",
              width: "250px",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <MenuItem
              hovered={hovered === "cancel"}
              selected={selected === "cancel"}
              onClick={() => handleClick("cancel")}
              onMouseEnter={() => handleHover("cancel")}
              onMouseLeave={() => handleExit("cancel")}
              style={{ fontSize: "18px", textDecoration: "underline" }}
            >
              Cancel
            </MenuItem>
            <MenuItem
              hovered={hovered === "speed"}
              selected={selected === "speed"}
              onClick={() => handleClick("speed")}
              onMouseEnter={() => handleHover("speed")}
              onMouseLeave={() => handleExit("speed")}
              style={{ fontSize: "18px", textDecoration: "underline" }}
            >
              Speed Up
            </MenuItem>
          </div>
          <TXForm type={selected} wallet={wallet} provider={provider} />
          {/* <span>Wallet: {wallet.address}</span> */}
          {/* <span style={{ fontSize: "24px", marginTop: "35px" }}>👁️‍🗨️ TX's</span> */}
        </>
      ) : (
        <Connect provider={provider} setWallet={setWallet} setCon={setCon} />
      )}
    </Container>
  );
};

export default Home;
