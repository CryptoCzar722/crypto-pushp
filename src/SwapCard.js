import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
//must be last import
//const axios = require("axios");
import TradingViewWidget from 'react-tradingview-widget';
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
//import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

export const SwapCard = () => {
  
  //application data
  const { isAuthenticated, logout, Moralis, user, ethAddress, authenticate, authError, isAuthenticating } = useMoralis();

  const handleCustomLogin = async () => {
    await authenticate({
      provider: "web3Auth",
      clientId: "BN-6dNNgKK_DJmhff63kvmqoyfUMVTEYdjRbp_pIZCvdPmj69n94pHl4rVCymrqmuUQAnB91e-5Go2TA2LzSdyM",
      chainId: Moralis.Chains.BNB,
      theme: 'dark',
      appLogo: "",
      logingMethodsOrder : ["google", "facebook", "twitter"]//, "reddit", "discord", "twitch", "apple", "github", "linkedin", "email_passwordless"]
    });
  };

  const [balance, setBalance] = useState(0);
  const [viewKey, setviewKey] = useState(0);
  //order info
  const [orderType,setOrderType] = useState("market");
  //in
  const [swapCoin, setSwapCoin] = useState("BUSD");
  const [swapCoinAddress, setSwapCoinAddress] = useState("");
  const [swapCoinAmount, setSwapCoinAmount] = useState("0.0");
  //out
  const [swapCoinOut, setSwapCoinOut] = useState("BNB");
  const [swapCoinAddressOut, setSwapCoinAddressOut] = useState("");
  const [swapCoinAmountOut, setSwapCoinAmountOut] = useState("0.0");
  //order stuff
  const [orderExchange,setOrderExchange] = useState("PancakeSwap");
  const [limitPrice,setLimitPrice] = useState("1");
  const [dataViewer,setDataViewer] = useState("chart");
  const [oneinchTokens,setOneinchTokens] = useState("");
  //imgs
  const [tokenInImg,setTokenInImg] = useState("https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c_1.png");
  const [tokenOutImg,setTokenOutImg] = useState("https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c_1.png");

  const fetchBalance = async () => {
    try {
      //tag 
      //console.log(user.attributes.authData.moralisEth.signature)
      const options = { chain: Moralis.Chains.BNB };
      const balance = await Moralis.Web3API.account.getNativeBalance(options);
      setBalance(balance.balance / 10 ** 18);
    } catch {}
  };

  const fetchTokens = async () => {
    await Moralis.initPlugins()
    const tokens = await Moralis.Plugins.oneInch.getSupportedTokens({
      chain: "bsc", // The blockchain you want to use (eth/bsc/polygon)
    });
    console.log("tokens=",(tokens.tokens));
    setOneinchTokens(tokens.tokens);
  }
  
  useEffect(() => {
    //fetchBalance();
    //console.log("swap card is authenticated ->", isAuthenticated);
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
    fetchTokens()
  }, []);
  
//NOTE: different than portfolio logic  must set object.keys first.
const renderAvailableTokens = () => {
  return Object.keys(oneinchTokens).map((key, index) => {
  //const {address,decimals,logoURI,name,symbol} = oneinchTokens //destructuring 
  //console.log(oneinchTokens[key]);    
  return (                          //oneinchTokens[key].symbol
            <option key={key} value={key}>{oneinchTokens[key].name}</option>
            )
  })
  }

  const FindAvailableToken = async (tokenAddy, in_out) => { 
    console.log("token OBJ", oneinchTokens[tokenAddy])
    
    in_out == 0 ?  setTokenInImg(oneinchTokens[tokenAddy].logoURI) :setTokenOutImg(oneinchTokens[tokenAddy].logoURI); 
    in_out == 0 ? setSwapCoin(oneinchTokens[tokenAddy].symbol) : setSwapCoinOut(oneinchTokens[tokenAddy].symbol);
    in_out == 0 ? setSwapCoinAddress(oneinchTokens[tokenAddy].address) : setSwapCoinAddressOut(oneinchTokens[tokenAddy].address)//.toUpperCase());
    setQuoteData(swapCoinAmount);
  }

  const setQuoteData = async (amount)=>{
    if (amount != ""){
    setSwapCoinAmount(amount)
    await Moralis.initPlugins()
    const swapOptions = {
      chain: 'bsc', // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: swapCoinAddress, // The token you want to swap
      toTokenAddress: swapCoinAddressOut, // The token you want to receive
      amount: Moralis.Units.Token(amount,"18"),
    };
    console.log("swapOptions=",swapOptions);
    
    const quote = await Moralis.Plugins.oneInch.quote(swapOptions);
    console.log(quote);//.estimatedGas);
    setSwapCoinAmountOut(quote.toTokenAmount / 1000000000000000000) /// quote.toToken.decimals)
  }
}

  const swapTokens = async ()=>{
    await Moralis.initPlugins()
    const swapOptions = {
      chain: 'bsc', // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: swapCoinAddress, // The token you want to swap
      toTokenAddress: swapCoinAddressOut, // The token you want to receive
      amount: swapCoinAmount,
    };
    console.log("swapOptions=",swapOptions);
    
    const quote = await Moralis.Plugins.oneInch.quote(swapOptions);
    console.log(quote.toTokenAmount)//estimatedGas);

  }
/*
<select  className={signOutStyle.sSwap} onChange ={ (event) => { setOrderExchange(event.target.value) }}>
            <option value="PancakeSwap">PancakeSwap</option>
      </select>
*/

//Tag add loading icon to output amount when http response is waiting.
return ( 
    <div className={isMobile == false ? signOutStyle.signOutCard : signOutStyle.signOutCardMobile}>
    <div>
    <div className={signOutStyle.swapCardMini}>
      <h4 className={signOutStyle.hAlert}> Swap </h4>
      <img src= {tokenInImg} width="20" height="20"/> 
      <select  className={signOutStyle.sSwap} onChange ={ (event) => { 
                //setTokenAddress(event.target.value) 
                console.log(event.target);
                FindAvailableToken(event.target.value,0) 
                }}>
                {renderAvailableTokens()}
      </select> 
      <input
          className= {signOutStyle.iSwap} //"form-control form-control-lg"
          type="number"
          placeholder={"0.0"}
          onChange={e => setQuoteData(e.target.value.toUpperCase())}//e.target.value.toUpperCase())} 
          required />
      <img src= {tokenOutImg} width="20" height="20"/> 
      <select  className={signOutStyle.sSwap} onChange ={ (event) => { 
                //setTokenAddress(event.target.value) 
                console.log(event.target.value.toString());
                FindAvailableToken(event.target.value,1) 
                }}>
                {renderAvailableTokens()}
      </select>
      <select  className={signOutStyle.sSwap} onChange ={ (event) => { setOrderType(event.target.value) }}>
            <option value="market">market</option>
            <option value="limit">limit</option>
      </select>
      <p className={signOutStyle.pAlert}>  Amount Out : {parseFloat(swapCoinAmountOut).toFixed(2)}</p> 
      {orderType == "market" ? 
      <hr></hr> 
      :
      <input
          className= {signOutStyle.iSwap}//"form-control form-control-lg"
          type="text"
          placeholder={"50.0"}
          onChange={e => setLimitPrice(e.target.value.toUpperCase())} 
          required />
      }
          <button className={styles.swapButton} onClick = {swapTokens} >
          Swap
          </button>
          {isAuthenticated ?
          <button className={styles.signoutButton} onClick={logout}>
          Logout
          </button>
          :          
          <button className={styles.signinButton} onClick={handleCustomLogin}>
             Login
          </button>

          } 
    </div>
    {
      isMobile ? <></> : 
    <div className={signOutStyle.chart}>
    <select  className={signOutStyle.sSwapData} onChange ={ (event) => { setDataViewer(event.target.value) }}>
            <option value="chart">Chart</option>
            <option value="ta">TA Insight</option>
    </select>
    {
      dataViewer === "chart" ? 
    <TradingViewWidget
        symbol={"BINANCE:"+swapCoinOut+swapCoin}//"BUSD"}
        locale="en"
        width = {500}
        height ={315}
      />
      :
      <TechnicalAnalysis 
      symbol={"BINANCE:"+swapCoinOut+"BUSD"}
      locale="en"
      colorTheme="light" 
      width = {500}
      height ={250}
        >
      </TechnicalAnalysis>
    }
    </div>
    }
    </div>
</div>

  );
};

    /*
    <p className={signOutStyle.pAlert}>  Amount In : {swapCoinAmount }</p> 
    //in 
    <input
          className= {signOutStyle.iSwap} //"form-control form-control-lg"
          type="text"
          placeholder={"BUSD"}
          onChange={e => setSwapCoin(e.target.value.toUpperCase())} 
          required />
    //out
     <input
          className= {signOutStyle.iSwap}//"form-control form-control-lg"
          type="text"
          placeholder={"BNB"}
          onChange={e => setSwapCoinOut(e.target.value.toUpperCase())} 
          required />
    */
   
//<img src= {tokenOutImg}/>
//<p className={signOutStyle.pAlert}>  Coin In : {swapCoin }</p> 
//<p className={signOutStyle.pAlert}>  Coin Out : {swapCoinOut}</p>

  /*
    <TradingViewWidget
        symbol={"BINANCE:"+swapCoinOut+"BUSD"}
        locale="fr"
        width = {500}
        height ={315}
      />
  <TradingViewWidget
        symbol={"BINANCE:"+swapCoin+"BUSD"}
        locale="fr"
        width = {500}
        height ={175}
      />

      <AdvancedRealTimeChart 
    theme="dark" 
    symbol={"BINANCE:"+swapCoinOut+"BUSD"}
    locale="fr"
    width = {500}
    height ={315}
    />

    <div>
      <div>
        <div className={signOutStyle.signOutCard}>
        <div>
        <div className={signOutStyle.swapCardMini}>
          <h4 className={signOutStyle.hAlert}> Swap </h4>
          <select  className={signOutStyle.sSwap} onChange ={ (event) => { setOrderExchange(event.target.value) }}>
                <option value="PancakeSwap">PancakeSwap</option>
          </select>
          <p className={signOutStyle.pAlert}>  Coin In : {swapCoin}</p> 
          <input
              className= {signOutStyle.iSwap} //"form-control form-control-lg"
              type="text"
              placeholder={"BTC"}
              onChange={e => setSwapCoin(e.target.value.toUpperCase())} 
              required />
          <p className={signOutStyle.pAlert}>  Coin Out : {swapCoinOut}</p>   
          <input
              className= {signOutStyle.iSwap}//"form-control form-control-lg"
              type="text"
              placeholder={"BUSD"}
              onChange={e => setSwapCoinOut(e.target.value.toUpperCase())} 
              required />
          <p className={signOutStyle.pAlert}> Order Type : {orderType} </p>
          <select  className={signOutStyle.sSwap} onChange ={ (event) => { setOrderType(event.target.value) }}>
                <option value="market">market</option>
                <option value="limit">limit</option>
          </select>
          {orderType == "market" ? 
          <p className={signOutStyle.pAlert}> Place Order</p> 
          :
          <input
              className= {signOutStyle.iSwap}//"form-control form-control-lg"
              type="text"
              placeholder={"$1.00"}
              onChange={e => setLimitPrice(e.target.value.toUpperCase())} 
              required />
          }
              <button className={styles.swapButton} onClick={logout}>
              Set Alert
              </button>
        </div>
        <div className={signOutStyle.chart}>
          <TradingViewWidget
            symbol={"BINANCE:"+swapCoin+"BUSD"}
            locale="fr"
            width = "500"
            height ="175"
          />
          <TradingViewWidget
            symbol={"BINANCE:"+swapCoinOut+"BUSD"}
            locale="fr"
            width = "500"
            height ="175"
          />
        </div>
        </div>
    </div>
    </div>
    <div>
    </div>
    <div>
    </div>
    </div>
  );
};
*/
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

