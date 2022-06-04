import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";

//must be last import
//const axios = require("axios");
import TradingViewWidget from 'react-tradingview-widget';

export const TopTen = () => {
  
  //application data
  const { logout, Moralis, user, ethAddress } = useMoralis();
  
  const [balance,setBalance] = useState("");  
  const [dateUpdated, setDateUpdated] = useState("");
  const [top10, setTop10] = useState([]);

  const queryTop10 = async ()=> {
    const query = new Moralis.Query("Top10");
    const top10 = await query.find();
    const top10O = JSON.parse(top10[0].attributes.Top10)
    //console.log("top10-> ",top10O.result);
    setTop10(top10O.result)
  }

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
    queryTop10();
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
  }, []);


const renderTableDataTop10 = () => {
    return top10.map((top10, index) => {
    const { circulation,marketCap,name,onedaychange,price,rank, sevendayschange,volume} = top10 //destructuring
      return (
          <tr className={signOutStyle.td}  key={rank}>
            <td>{rank}</td>
            <td>{name}</td>
            <td>{marketCap}</td>
            <td>{circulation}</td>
            <td>{onedaychange}</td>
            <td>{price}</td>
            <td>{sevendayschange}</td>
            <td>{volume}</td>
          </tr>
      )
    })
    }
    
  return ( 
    <div className={signOutStyle.top10Card}>
      <h5 className= {signOutStyle.hTop10}> Top 10 </h5>
      <h7>{dateUpdated}</h7>
        <div>
                <table className={signOutStyle.table}>
                  <thead>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Market Cap.</th>
                  <th>Circulation</th>
                  <th>1D</th>
                  <th>Price</th>
                  <th>7D</th>
                  <th>Volume</th>
                  </thead>
                  <tbody >
                    {renderTableDataTop10()}
                  </tbody>
                </table>
        </div>    
      </div>
  );
};
