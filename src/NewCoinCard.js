import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer"

export const NewCoinCard = () => {
  
  //application data
  const { logout, Moralis, user, ethAddress } = useMoralis();
  const [dateUpdated, setDateUpdated] = useState("");
  const [recentCoins, setRecentCoins] = useState([]);
  
  const queryRecentCoins = async ()=> {
    const query = new Moralis.Query("NewCoins");
    const newCoins = await query.find();
    const newCoinsO = JSON.parse(newCoins[0].attributes.NewCoins)
    //console.log("newCoins-> ",newCoins[0].attributes.updatedAt);
    setDateUpdated(new Date(newCoins[0].attributes.updatedAt.toString()).toString());
    setRecentCoins(newCoinsO.result)
  }
  
  useEffect(() => {
    queryRecentCoins();
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
  }, []);
//newest coinmarketcap coins
const renderTableData = () => {
    return recentCoins.map((recentCoins, index) => {
       const { Blockchain, added, marketCap, volume, rank, name, price,onehourchange,onedaychange} = recentCoins //destructuring
       return (
          <tr className={signOutStyle.td} key={name}>
             <td>{name}</td>
             <td>{price}</td>
             <td>{onehourchange}</td>
             <td>{onedaychange}</td>
             <td>{Blockchain}</td>
             <td>{added}</td>
             <td>{marketCap}</td>
             <td>{volume}</td>
          </tr>

       )
    })
  }
  
  return ( 
    <div className={signOutStyle.medCard}>
          <h5>New Projects</h5>
          <h7>{dateUpdated}</h7>
          <div>
            <table className={signOutStyle.table}>
            <thead>
             <th>Name</th>
             <th>Price</th>
             <th>1H</th>
             <th>1D</th>
             <th>Chain</th>
             <th>Added</th>
             <th>Market Cap.</th>
             <th>Volume</th>
            </thead>
               <tbody >
                {renderTableData()}
               </tbody>
            </table>
         </div>
    </div>
    
  );
};
