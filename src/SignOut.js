import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";


import { SwapCard } from "./SwapCard";
import { AlertCard } from "./AlertCard";
import { TopTen } from './TopTen';
import { FearCard } from './FearCard';
import { NewCoinCard } from './NewCoinCard';
import { PortFolioCard } from './PortFolioCard';
import { TopGainers } from './TopGainers';
import { TopLosers } from './TopLosers';
//must be last import
//const axios = require("axios");

export const SignOut = () => {
  
  //application data
  const { logout, Moralis, user, ethAddress } = useMoralis();
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      //tag 
      //console.log(user.attributes.authData.moralisEth.signature)
      const options = { chain: Moralis.Chains.BNB };
      const balance = await Moralis.Web3API.account.getNativeBalance(options);
      setBalance(balance.balance / 10 ** 18);
    } catch {}
  };
  useEffect(() => {
    fetchBalance();
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
  }, []);

  const handleTransfer = async () => {
    try {
      await Moralis.transfer({
        amount: Moralis.Units.ETH("0.1"),
        receiver: "",
        type: "native",
      }).then((e) => {
        alert("sucesfully transfered");
      });
      await fetchBalance();
    } catch {}
  };

 
  return (
    <div>
      <div>
        <SwapCard/>
        <AlertCard/>
      </div>
      <PortFolioCard/>
      <div>
        <TopTen/>
      </div>
      
      <FearCard/>
      <NewCoinCard/>

      <div>
        <TopLosers/>
        <TopGainers/>
      </div>
    </div>
  );
};

/*

        <p className={signOutStyle.subHeader}>Details:</p>
          <div className={signOutStyle.detailsDiv}>
          <div>
            <h5>Account: </h5>
            <p>{user.attributes.accounts}</p>
          </div>
          <div className={signOutStyle.pTextHidden} >
            <h5>Private Key:</h5>
              <p className={signOutStyle.pTextHidden}> {user.attributes.authData.moralisEth.signature}</p>
          </div>
          <div>
            <h5>Balance (Eth)</h5>
            <p>{balance} </p>
          </div>
        </div>

        <div className={signOutStyle.fotter}>
          <button className={styles.loginButton} onClick={handleTransfer}>
            Test Transfer
          </button>
          <button className={styles.loginButton} onClick={logout}>
            Sign Out
          </button>
          <button className={`${signOutStyle.refresh}`} onClick={fetchBalance}>
            Refresh
          </button>
        </div>
        
        */

