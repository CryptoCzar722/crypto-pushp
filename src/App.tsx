import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MoralisProvider} from "react-moralis";
import { useState } from "react";
import SignIn from "./SignIn";
import { SignOut } from "./SignOut";
import  AlertsApp  from "./AlertsApp";
import styles from "./styles/Home.module.css";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { TickerTape } from "react-ts-tradingview-widgets";

import Header  from './Header';
import { SwapCard } from "./SwapCard";
import { AlertCard } from "./AlertCard";
import { TopTen } from './TopTen';
import { FearCard } from './FearCard';
import { NewCoinCard } from './NewCoinCard';
import { PortFolioCard } from './PortFolioCard';
import { TopGainers } from './TopGainers';
import { TopLosers } from './TopLosers';
import { NewsCard } from './NewsCard';

/*
      <div className={styles.divBack} >
        <h1 className={styles.hNav}>Crypto-Push {isMobile.toString() }</h1>
      </div>
*/
//fix later
//<div>{pageState}</div>
//<Header page = {pageState} setpage = {setPageState}  />

function App() {
  //console.log("process.env ",process.env)
  const [pageState, setPageState] = useState("alert");
//add settings to pick with tokens are up top
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
    <MoralisProvider serverUrl="https://tmplbudfhggp.usemoralis.com:2053/server" appId="zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz"> 
        <TickerTape 
        symbols = {tickerSymbols}
        colorTheme="light"
        ></TickerTape>
        <div className= {styles.divButtons}>
         <button className={styles.pageButton} onClick={() => setPageState("dex")}>
              Swap
        </button>

        <button className={styles.pageButton} onClick={() => setPageState("port")}>
              Portfolio
        </button>

        <button className={styles.pageButton} onClick={() => setPageState("alert")}>
              Alerts
        </button>
        
        <button className={styles.pageButton} onClick={() => setPageState("market")}>
            Market
        </button>

        <button className={styles.pageButton} onClick={() => setPageState("news")}>
            News
        </button>
        </div>
        {
        pageState == "dex" ?
          <div className={styles.backgroundParent}>
            <SwapCard/>
          </div>
          :
          pageState == "news" ? 
          <div className={styles.backgroundParent}>
            <NewsCard/> 
          </div> :
          pageState == "port" ? 
          <div className={styles.backgroundParent}>
            <PortFolioCard/> 
          </div>
          :
          pageState == "alert" ? 
          <div className={styles.backgroundParent}>
            <AlertCard/> 
          </div>
          :
          pageState == "market" ?    
          <div className={styles.backgroundParent}>  
              <div>
                <FearCard/>
                <NewCoinCard/>
              </div>
              <div>
                <TopTen/>
              </div>  
              <div>
                <TopLosers/>
                <TopGainers/>
              </div>
          </div>
          :
          <AlertsApp/> 
        }
    </MoralisProvider>
  );
}

export default App;

/*
<div>
      <div className={styles.backgroundParent}>
        {isAuthenticated ? <SignOut /> : <SignIn />}
      </div>
    </div>
*/
