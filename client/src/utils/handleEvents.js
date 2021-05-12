import { ethers } from "ethers";

export const providerEvents = async (provider, wallet) => {
  //   const filter = {
  //     address: wallet.address,
  //   };

  provider.on("newPendingTransactions", (tx) => {
    console.log(tx);
  });

  //   provider.on("block", (block) => {
  //     console.log(block);
  //   });
};
