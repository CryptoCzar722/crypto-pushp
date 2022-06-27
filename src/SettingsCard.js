import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";

import { useEffect, useState } from "react";
import { Timeline } from "react-ts-tradingview-widgets";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

export const SettingsCard = () => {
  
  //application data
  const { isAuthenticated, logout, Moralis, user, ethAddress } = useMoralis();
  
  useEffect(() => {
    //fetchBalance();
    console.log("news card is authenticated ->", isAuthenticated);
  }, []);

  return ( 
        <div className={isMobile == false ? signOutStyle.NewsCard :  signOutStyle.NewsCardMobile}>
            <h4 className={signOutStyle.hNews}> Settings </h4>
            <Timeline colorTheme="light" feedMode="market" market="crypto" height={400} width="100%"></Timeline>
        </div>  
  );
};
