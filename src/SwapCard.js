import React from 'react';
import { useMoralis,useMoralisWeb3Api } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";

import TradingViewWidget from 'react-tradingview-widget';
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { TailSpin } from  'react-loader-spinner'
//must be last import
const axios = require("axios");

//import { FaLongArrowAltDown,FaArrowsAltV } from 'react-icons/fa';
/*
curl -X 'GET' \
  'https://api.1inch.io/v4.0/56/tokens' \
  -H 'accept: application/json'
*/

export const SwapCard = () => {
  
  //application data
  const { isAuthenticated, logout, Moralis, user, ethAddress, authenticate, authError, isAuthenticating } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const handleCustomLogin = async () => {
    await authenticate({
      provider: "web3Auth",
      clientId:"BCYdRX4SDVbsfHOGHTYDxF3b8ktRUAQDmvLIitizwaUVtWZeosFhOR13vJlCWJI2TKRwVLhPGJboxWa1n7Mfuso",//clientId: "BN-6dNNgKK_DJmhff63kvmqoyfUMVTEYdjRbp_pIZCvdPmj69n94pHl4rVCymrqmuUQAnB91e-5Go2TA2LzSdyM",
      chainId: '0x38',//Moralis.Chains.BNB,
      theme: 'dark',
      //appLogo: "",
      //logingMethodsOrder : ["google", "facebook", "twitter"]//, "reddit", "discord", "twitch", "apple", "github", "linkedin", "email_passwordless"]
    });
  };

  const [chain, setChain] = useState('56');

  const options1Inch = {
    method: 'GET',
    //url:'https://api.1inch.io/v4.0/56/tokens',
    url:`https://api.1inch.io/v4.0/${chain}/tokens`,
    headers: {
      'accept': 'application/json'
    }
  };

  const [balance, setBalance] = useState(0);
  const [viewKey, setviewKey] = useState(0);
  //order info
  const [orderType,setOrderType] = useState("market");
  //in
  const [swapCoin, setSwapCoin] = useState("BUSD")//USDC");
  const [swapCoinDecimals, setSwapCoinDecimals] = useState("18")
  const [swapCoinAddress, setSwapCoinAddress] = useState("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");//"0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d");
  const [swapCoinAmount, setSwapCoinAmount] = useState("0.00");
  //out
  const [swapCoinOut, setSwapCoinOut] = useState("BNB");
  const [swapCoinAddressOut, setSwapCoinAddressOut] = useState("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  const [swapCoinAmountOut, setSwapCoinAmountOut] = useState("0.00");
  const [swapCoinAmountOut1Inch, setSwapCoinAmountOut1Inch] = useState("0.00");

  //order stuff
  const [orderExchange,setOrderExchange] = useState("PancakeSwap");
  const [limitPrice,setLimitPrice] = useState("1");
  const [dataViewer,setDataViewer] = useState("chart");
  const [oneinchTokens,setOneinchTokens] = useState("");
  //imgs
  const [tokenInImg,setTokenInImg] = useState("https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c_1.png");//"https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png")
  const [tokenOutImg,setTokenOutImg] = useState("https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c_1.png");
  const [calculatingPrice, setCalculatingPrice] = useState(false);
  
  const fetchBalance = async () => {
    //try {
      //tag 
      //console.log(user.attributes.authData.moralisEth.signature)
      const options = { chain: '0x38' , address: user.attributes.accounts};
      const balance = await Web3Api.account.getNativeBalance(options);
      console.log("address + balance ", user.attributes.accounts,"...", balance)
      setBalance(balance.balance / 10 ** 18);
    //} catch {}
  };

  /*const fetchTokens = async () => {
    await Moralis.initPlugins()
    const tokens = await Moralis.Plugins.oneInch.getSupportedTokens({
      chain: "bsc", // The blockchain you want to use (eth/bsc/polygon)
    });
    console.log("tokens=",(tokens));
    console.log("tokens.tokens=",(tokens.tokens));
    setOneinchTokens(tokens.tokens);
  }*/
  
  useEffect(() => {
    //console.log("swap card is authenticated ->", isAuthenticated);
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
    console.log("isAuthenticated:",isAuthenticated);
    if (isAuthenticated) fetchBalance();
    //fetchTokens();
    //put axios calls in to backend later
    axios.request(options1Inch).then(function (response) {
            console.log("axios 1Inch response.data", response.data.tokens);
            setOneinchTokens(response.data.tokens);
        }).catch(function (error) {
          console.error(error);
          setOneinchTokens("");
        });

  }, []);
  
//NOTE: different than portfolio logic  must set object.keys first.
const renderAvailableTokens = () => {
  return Object.keys(oneinchTokens).map((key, index) => {
  //const {address,decimals,logoURI,name,symbol} = oneinchTokens //destructuring 
  //console.log(oneinchTokens[key]);    
  return (          //default = {swapCoin}      //oneinchTokens[key].symbol
            <option  key={key} value={key}>{oneinchTokens[key].name}</option>
            )
  })
  }

  /*
  curl -X 'GET' \
  'https://api.1inch.io/v4.0/56/quote?fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toTokenAddress=0x111111111117dc0aa78b770fa6a738034120c302&amount=10000000000000000' \
  -H 'accept: application/json'
  */
const setQuoteData = async (amount,AddressIn,AddressOut)=>{
  //setTimeout(async () => {
  setCalculatingPrice(true)
  if (amount != "")
    {
    setSwapCoinAmount(amount)
    
    const options1InchQuote = {
      method: 'GET',
      url:`https://api.1inch.io/v4.0/56/quote?fromTokenAddress=${AddressIn}&toTokenAddress=${AddressOut}&amount=${Moralis.Units.Token(amount,swapCoinDecimals)}`,
      headers: {
        'accept': 'application/json'
        }
      };

    await axios.request(options1InchQuote).then(function (response) {
      console.log("axios Quote 1Inch", response.data)
      console.log("axios Quote 1Inch formatted", parseFloat(Moralis.Units.FromWei(response.data.toTokenAmount,response.data.toToken.decimals)).toFixed(2));          
      setSwapCoinAmountOut1Inch(parseFloat(Moralis.Units.FromWei(response.data.toTokenAmount,response.data.toToken.decimals)).toFixed(2));
    }).catch(function (error) {
          console.error("axios error Quote", error);
      });

    await Moralis.initPlugins()
    const swapOptions = {
      chain: 'bsc',                 // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: AddressIn,  // The token you want to swap
      toTokenAddress: AddressOut,   // The token you want to receive
      amount: Moralis.Units.Token(amount,swapCoinDecimals)//"18"), //ensure to parse to correct deicmals
    };
    
    await Moralis.Plugins.oneInch.quote(swapOptions).then((quote) => {
      console.log("quote-",quote);
      console.log("quote.toTokenAmount-",quote.toTokenAmount);
      console.log("quote.toTokenAmount-",quote.toToken.decimals);
      console.log("quote formatted-",parseFloat(Moralis.Units.FromWei(quote.toTokenAmount,quote.toToken.decimals)).toFixed(2))

      if (parseFloat(Moralis.Units.FromWei(quote.toTokenAmount,quote.toToken.decimals)).toFixed(2) == "1.157920892373162e+59"){
      //old way broken leaving for ref of what not to do
      //setSwapCoinAmountOut(parseFloat(quote.toTokenAmount / 1000000000000000000).toFixed(2)) /// quote.toToken.decimals)
      //ideal method
      setSwapCoinAmountOut("1inch quote error - Retry")
      }
      else {
        setSwapCoinAmountOut(parseFloat(Moralis.Units.FromWei(quote.toTokenAmount,quote.toToken.decimals)).toFixed(4))
      }
      setCalculatingPrice(false)

    }).catch((error)=>{
      console.log("error-",error);
      setSwapCoinAmountOut("--");
      setCalculatingPrice(false)
    });
    }
  else 
    {
    setSwapCoinAmountOut("0.00");
    setCalculatingPrice(false)
    }
  //},1000);
}
const switchTokens = () => {
  console.log("switch token0<->token1");
  const token0 = swapCoinAddressOut;
  const token1 = swapCoinAddress;
  const token0Uri = tokenOutImg;
  const token1Uri = tokenInImg;

  setTokenInImg(token0Uri);
  setTokenOutImg(token1Uri); 
  setSwapCoin(token0);
  setSwapCoinAddress(token1);
  setSwapCoinAmountOut("--")
  setQuoteData(swapCoinAmount,token0,token1);          
};

  const swapTokens = async ()=>{
    console.log("swapping tokens")
  };

  const loadNewChain = async (value) =>{
    setChain(value)
  }

/*
<select  className={signOutStyle.sSwap} onChange ={ (event) => { setOrderExchange(event.target.value) }}>
            <option value="PancakeSwap">PancakeSwap</option>
      </select>

      <button className={styles.switchButton} onClick = {switchTokens} >
          <FaArrowsAltV  className={signOutStyle.swapArrow} />
        </button>

         <div className={signOutStyle.smalltext}>{swapCoinAddress} to {swapCoinAddressOut}</div>

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
         */

//Tag add loading icon to output amount when http response is waiting.
return ( 
    <div className={isMobile == false ? signOutStyle.signOutCard : signOutStyle.signOutCardMobile}>
      <div>
      <div className={signOutStyle.swapCardMini}>
        <h4 className={signOutStyle.hAlert}> Swap</h4>
        <select  className={signOutStyle.sSwap} onChange ={ (event) => { loadNewChain(event.target.value)}}>
            <option value="56">BSC</option>
            <option value="1">ETH</option>
            <option value="137">POLY</option>
        </select>
        <img src= {tokenInImg} width="30" height="30"/> 
        <div className={signOutStyle.smalltext}>{swapCoinAddress} </div>
        <select  className={signOutStyle.sSwap} onChange ={ (event) => {  
              setTokenInImg(oneinchTokens[event.target.value].logoURI); 
              setSwapCoinDecimals(oneinchTokens[event.target.value].decimals);
              setSwapCoin(oneinchTokens[event.target.value].symbol);
              setSwapCoinAddress(oneinchTokens[event.target.value].address)
              setSwapCoinAmountOut("--")
              setQuoteData(swapCoinAmount,oneinchTokens[event.target.value].address,swapCoinAddressOut);
                }}
          defaultValue={swapCoin}>
                {renderAvailableTokens()}
        </select> 
        <input
          className= {signOutStyle.iSwap} 
          type="number"
          placeholder={swapCoinAmount}
          onChange={e => setQuoteData(e.target.value, swapCoinAddress,swapCoinAddressOut)}
          required />
        
        <img src= {tokenOutImg} width="30" height="30"/> 
        <div className={signOutStyle.smalltext}>{swapCoinAddressOut} </div>
        <select  className={signOutStyle.sSwap} onChange ={ (event) => { 
                setTokenOutImg(oneinchTokens[event.target.value].logoURI); 
                setSwapCoinOut(oneinchTokens[event.target.value].symbol);
                setSwapCoinAddressOut(oneinchTokens[event.target.value].address)
                setSwapCoinAmountOut("--")
                setQuoteData(swapCoinAmount,swapCoinAddress,oneinchTokens[event.target.value].address);
                }}
                defaultValue={swapCoinOut}>
                {renderAvailableTokens()}
        </select>
        {
        calculatingPrice == false ? 
        <p className={signOutStyle.pAlert}>  Moralis Amount Out : {swapCoinAmountOut}  or 1Inch Direct : {swapCoinAmountOut1Inch} </p> 
        :
        <TailSpin
          height="25"
          width="200"
          color='red'
          ariaLabel='loading'
          style = {"text-align : center"}
        />
        }
       { 
       /*
       //need to do the backend work
       <select  className={signOutStyle.sSwap} onChange ={ (event) => { setOrderType(event.target.value) }}>
            <option value="market">market</option>
            <option value="limit">limit</option>
        </select>*/
        }
        {
        //remove limit order until backend is done, or add variable in back end to flag it
        orderType == "market" ? 
        <hr></hr> 
        :
        <input
          className= {signOutStyle.iSwap}//"form-control form-control-lg"
          type="text"
          placeholder={"50.0"}
          onChange={e => 
            //setLimitPrice(e.target.value.toUpperCase())
            setSwapCoinAmountOut(e.target.value * swapCoinAmount)
          } 
          required />
        }
        <p className={signOutStyle.pAlert}>  BNB : {balance}</p> 
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

