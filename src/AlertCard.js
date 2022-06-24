import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
import { FaBan } from 'react-icons/fa';


export const AlertCard = () => {
  
  //application data
  

  const { isAuthenticated, logout, Moralis, user, ethAddress } = useMoralis();
  
  const [alertCoin, setAlertCoin] = useState("BTC");
  const [alertType, setAlertType] = useState("percent");
  const [alertCoinPercent, setAlertCoinPercent] = useState("None");
  const [alertCoinPrice, setAlertCoinPrice] = useState("None");
  const [alertDirection, setAlertDirection] = useState("None");
  const [phoneNumber,setPhoneNumber] = useState("");
  const [balance,setBalance] = useState("");  

  const fetchBalance = async () => {
    try {
      //tag 
      //console.log(user.attributes.authData.moralisEth.signature)
      const options = { chain: Moralis.Chains.BNB };
      const balance = await Moralis.Web3API.account.getNativeBalance(options);
      setBalance(balance.balance / 10 ** 18);
    } catch {}
  };

  const saveAlert = async () =>{
      
      const Alert = Moralis.Object.extend("Alert");
      const alert = new Alert();
      alert.set("phone_number", phoneNumber);
      alert.set("coin", alertCoin);
      alert.set("percent", alertCoinPercent);
      alert.set("direction", alertDirection);
      await alert.save().then(()=>{
        //alert.show("Alert saved you will received a text shortly!");
      });

    
  }

  const fetchPrices = async (coin) => {
    setAlertCoin(coin) 
    let coinStringClass = "";
    if (coin == "BTC"){
      coinStringClass = "btc_price_stats";
    }
    else if (coin == "ETH"){
      coinStringClass = "eth_price_stats";
    }
    const query = new Moralis.Query(coinStringClass);
    const statsCount = await query.count();
    query.limit(statsCount);
    const stats = await query.find({ useMasterKey: true });
    const stats_old_price = stats[stats.length - 1].attributes.price / 1;
    console.log("Most recent BTC price = ",stats_old_price)
    setAlertCoinPrice(parseFloat(stats_old_price).toFixed(2))
  }

  useEffect(() => {
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
    fetchPrices("BTC");
    console.log("alert card is authenticated ->", isAuthenticated);
  }, []);

  /*
  <input
              className= {signOutStyle.iAlert}//"form-control form-control-lg"
              type="text"
              placeholder={"+1XXXXXXXXXX"}
              onChange={e => setPhoneNumber(e.target.value.toUpperCase())} 
              required />
  */

  return ( 
    <div className={signOutStyle.alertCard}>
      <select  className={signOutStyle.sAlertType} onChange ={ (event) => { 
            setAlertType(event.target.value) 
            }}>
                <option value="percent">Percent</option>
                <option value="price">Price</option>
          </select>
        <div className={signOutStyle.alertCardMini}>
        <h4 className={signOutStyle.hAlert}> Text Alerts </h4>
          {
            isAuthenticated 
            ?
            <>
          <select  className={signOutStyle.sAlert} onChange ={ (event) => { 
            //setAlertCoin(event.target.value) 
            fetchPrices(event.target.value)
            }}>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="BNB">BNB</option>
          </select>
          <p className={signOutStyle.pAlert}>    Currnet price : ${alertCoinPrice}</p> 
          <select  className={signOutStyle.sAlert} onChange ={ (event) => { setAlertCoinPercent(event.target.value) }}>
                <option value="1">1%</option>
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="15">15%</option>
          </select>
          <p className={signOutStyle.pAlert}>  Percent Selected : {alertCoinPercent == "None" ? alertCoinPercent : alertCoinPercent + "%" }</p> 
          <select className={signOutStyle.sAlert} onChange ={ (event) => { setAlertDirection(event.target.value) }}>
                <option value="increase">increase</option>
                <option value="decrease">decrease</option>
                <option value="either">inc. or dec.</option>
          </select>
          <p className={signOutStyle.pAlert} >  Price Direction : {alertDirection}</p> 
          <input
              className= {signOutStyle.iAlert}//"form-control form-control-lg"
              type="text"
              placeholder={"+1XXXXXXXXXX"}
              onChange={e => setPhoneNumber(e.target.value.toUpperCase())} 
              required />
              <button className={styles.alertButton} onClick={saveAlert}>
              Set Alert
              </button>
              </>
        :
        <>
        
        <FaBan  className={signOutStyle.iError} />
        <h4 className={signOutStyle.hError}> Login to Get Alerts </h4>
        </>
      }
      
        </div>  
         
      </div>
  );
};
