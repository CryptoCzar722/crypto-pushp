import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";

import { useEffect, useState } from "react";
import { Timeline } from "react-ts-tradingview-widgets";

export const NewsCard = () => {
  
  //application data
  const { isAuthenticated, logout, Moralis, user, ethAddress } = useMoralis();
  
  useEffect(() => {
    //fetchBalance();
    console.log("alert card is authenticated ->", isAuthenticated);
  }, []);

  return ( 
        <div className={signOutStyle.NewsCard}>
            <h4 className={signOutStyle.hNews}> News Presented by TradingView </h4>
            <Timeline colorTheme="light" feedMode="market" market="crypto" height={400} width="100%"></Timeline>
        </div>  
  );
};
