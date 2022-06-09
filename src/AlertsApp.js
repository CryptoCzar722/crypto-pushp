import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useMoralis} from "react-moralis";
import { useState } from "react";
import SignIn from "./SignIn";
import { SignOut } from "./SignOut";

import styles from "./styles/Home.module.css";
import { TickerTape } from "react-ts-tradingview-widgets";
//{isAuthenticated ? <SignOut /> : <SignIn />}
//import { Timeline } from "react-ts-tradingview-widgets";
//<Timeline colorTheme="light"  feedMode="market" market="crypto" height={400} width="50%"></Timeline>
function AlertsApp() {
    const {isAuthenticated, Moralis} = useMoralis();
    const tickerSymbols = [
        {
          "proName": "BINANCE:BTCBUSD",
          "title": "BTC/BUSD"
        },
        {
          "proName": "BINANCE:ETHBUSD",
          "title": "ETH/BUSD"
        },
        {
          "proName": "BINANCE:SOLBUSD",
          "title": "SOL/BUSD"
        },
        {
          "proName": "BINANCE:ADABUSD",
          "title": "ADA/BUSD"
        },
        {
          "proName": "BINANCE:BNBBUSD",
          "title": "BNB/BUSD"
        }
      ];
    return (
        <div>
            <TickerTape symbols = {tickerSymbols}
            colorTheme="light"></TickerTape>
            <div className={styles.backgroundParent}>
            <SignOut />
            </div>
        </div>
        
    );
}

export default AlertsApp;
