import React from 'react';
import './App.css';
import { MoralisProvider, useMoralis} from "react-moralis";
import { useEffect, useState } from "react";
//import logo from './logo.svg';
//import SignIn from "./SignIn";
//import { SignOut } from "./SignOut";
//import  AlertsApp  from "./AlertsApp";
//import Header  from './Header';
import styles from "./styles/Home.module.css";
import signOutStyle from "./styles/SignOut.module.css";

import { TickerTape } from "react-ts-tradingview-widgets";
import { SwapCard } from "./SwapCard";
import { AlertCard } from "./AlertCard";
import { PortFolioCard } from './PortFolioCard';
import { NewsCard } from './NewsCard';
import { SettingsCard } from './SettingsCard';
import {MarketPage} from './MarketPage';

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { FiSettings } from 'react-icons/fi';
import {TxHistory} from './TxHistory'
/*
<button className={isMobile ? styles.stgButtonMobile : styles.stgButton} onClick={() => setPageState("settings")}>
          <FiSettings  className={signOutStyle.settingsIcon} />
</button>
*/

function App() {
  //console.log("process.env ",process.env)
  const [pageState, setPageState] = useState("dex");
  const [coin0, setCoin0] = useState("BTC");
  const [coin1, setCoin1] = useState("ETH");
  const [coin2, setCoin2] = useState("ADA");
  const [coin3, setCoin3] = useState("BNB");
  const [coin4, setCoin4] = useState("SOL");
  const [coin5, setCoin5] = useState("XRP");
  
//add settings to pick with tokens are up top
  let tickerSymbols = [
    {
      "proName": `BINANCE:${coin0}BUSD`,
      "title": `${coin0}/BUSD`
    },
    {
      "proName": `BINANCE:${coin1}BUSD`,
      "title": `${coin1}/BUSD`
    },
    {
      "proName": `BINANCE:${coin2}BUSD`,
      "title": `${coin2}/BUSD`
    },
    {
      "proName": `BINANCE:${coin3}BUSD`,
      "title": `${coin3}/BUSD`
    },
    {
      "proName": `BINANCE:${coin4}BUSD`,
      "title": `${coin4}/BUSD`
    },
    {
      "proName": `BINANCE:${coin5}BUSD`,
      "title": `${coin5}/BUSD`
    },
   
  ];
  
  return (
    <MoralisProvider serverUrl="https://tmplbudfhggp.usemoralis.com:2053/server" appId="zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz"> 
        <TickerTape 
        symbols = {tickerSymbols}
        colorTheme="light"
        ></TickerTape>
        <div className= {styles.divButtons}>
        {/*<BrowserView>*/}

        <button className={isMobile ? styles.pageButtonMobile : styles.pageButton} onClick={() => setPageState("dex")}>
              Swap
        </button>
        
        <button className={isMobile ? styles.pageButtonMobile : styles.pageButton } onClick={() => setPageState("market")}>
          {isMobile}  Market
        </button>

        <button className={isMobile ? styles.pageButtonMobile : styles.pageButton} onClick={() => setPageState("port")}>
              Portfolio
        </button>
        <button className={isMobile ? styles.pageButtonMobile : styles.pageButton} onClick={() => setPageState("history")}>
            Tx History
        </button>

        <button className={isMobile ? styles.pageButtonMobile : styles.pageButton} onClick={() => setPageState("alert")}>
              Alerts
        </button>

        <button className={isMobile ? styles.pageButtonMobile : styles.pageButton} onClick={() => setPageState("news")}>
            News
        </button>

        </div>
        {
        (pageState == "dex") ?
          <div className={styles.backgroundParent}>
            <SwapCard/>
          </div>
          :
          (pageState == "history") ?
          <div className={styles.backgroundParent}>
            <TxHistory/>
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
            <MarketPage/>
          </div> 
          :
          pageState == "settings" ? 
          <div className={styles.backgroundParent}>
            <div className={isMobile == false ? signOutStyle.NewsCard :  signOutStyle.NewsCardMobile}>
              <h4 className={signOutStyle.hNews}> Settings </h4>
              <select  className={signOutStyle.sSettings} onChange ={ (event) => { 
              //setAlertCoin(event.target.value) 
              setCoin0(event.target.value)
              }}>
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                  <option value="ADA">ADA</option>
                  <option value="BNB">BNB</option>
                  <option value="SOL">SOL</option>  
                  <option value="XRP">XRP</option>
                  <option value="OFF">OFF</option>
            </select>

            <select  className={signOutStyle.sSettings} onChange ={ (event) => { 
              //setAlertCoin(event.target.value) 
              setCoin1(event.target.value)
              }}>
                  <option value="ETH">ETH</option>
                  <option value="BTC">BTC</option>
                  <option value="ADA">ADA</option>
                  <option value="BNB">BNB</option>
                  <option value="SOL">SOL</option>
                  <option value="XRP">XRP</option>
                  <option value="OFF">OFF</option>
            </select>
            
            <select  className={signOutStyle.sSettings} onChange ={ (event) => { 
              //setAlertCoin(event.target.value) 
              setCoin2(event.target.value)
              }}>
                  <option value="ADA">ADA</option>
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                  <option value="BNB">BNB</option>
                  <option value="SOL">SOL</option>
                  <option value="XRP">XRP</option>
                  <option value="OFF">OFF</option>
            </select>

            <select  className={signOutStyle.sSettings} onChange ={ (event) => { 
              //setAlertCoin(event.target.value) 
              setCoin3(event.target.value)
              }}>
                  <option value="BNB">BNB</option>
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                  <option value="SOL">SOL</option>
                  <option value="ADA">ADA</option>
                  <option value="XRP">XRP</option>
                  <option value="OFF">OFF</option>
            </select>

            <select  className={signOutStyle.sSettings} onChange ={ (event) => { 
              //setAlertCoin(event.target.value) 
              setCoin4(event.target.value)
              }}>
                  <option value="SOL">SOL</option>
                  <option value="BTC">BTC</option>
                  <option value="BNB">BNB</option>
                  <option value="ETH">ETH</option>
                  <option value="ADA">ADA</option>
                  <option value="XRP">XRP</option>
                  <option value="OFF">OFF</option>
            </select>

            <select  className={signOutStyle.sSettings} onChange ={ (event) => { 
              //setAlertCoin(event.target.value) 
              setCoin5(event.target.value)
              }}>
                  <option value="XRP">XRP</option>
                  <option value="BTC">BTC</option>
                  <option value="BNB">BNB</option>
                  <option value="ETH">ETH</option>
                  <option value="SOL">SOL</option>
                  <option value="ADA">ADA</option>
                  <option value="OFF">OFF</option>
            </select>

            </div>  
          </div> 
          /*<div className={styles.backgroundParent}>  
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
          </div>*/
          :
          <h5>Reload Application</h5>
          
        }
        {
          /*
          <AlertsApp/> 
          
          <MobileView>
          <button className={isMobile ? styles.pageButtonMobile : styles.pageButton } onClick={() => setPageState("market")}>
            {isMobile}  Market
          </button>

          <button className={isMobile ? styles.pageButtonMobile : styles.pageButton} onClick={() => setPageState("dex")}>
                Swap
          </button>

          <button className={isMobile ? styles.pageButtonMobile : styles.pageButton} onClick={() => setPageState("port")}>
                Portfolio
          </button>

          <button className={isMobile ? styles.pageButtonMobile : styles.pageButton} onClick={() => setPageState("alert")}>
                Alerts
          </button>

          <button className={isMobile ? styles.pageButtonMobile : styles.pageButton} onClick={() => setPageState("news")}>
              News
          </button>
        </MobileView>
        */
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
