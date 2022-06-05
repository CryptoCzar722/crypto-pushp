import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer"

export const TopLosers = () => {
  
  //application data
  const { logout, Moralis, user, ethAddress } = useMoralis();
  const [dateUpdated, setDateUpdated] = useState("");
  const [recentLosers, setRecentLosers] = useState([]);
  
  const queryRecentLosers = async ()=> {
    const query = new Moralis.Query("TopLosers");
    const topLs = await query.find();
    const topLsO = JSON.parse(topLs[0].attributes.TopLosers)
    setDateUpdated(new Date(topLs[0].attributes.updatedAt.toString()).toString());
    //console.log("topLs-> ",topLsO.result);
    setRecentLosers(topLsO.result)
  }

  useEffect(() => {
    queryRecentLosers();
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
  }, []);

  const renderTableDataLosers = () => {
    return recentLosers.map((recentLosers, index) => {
      const { name,onedaychange,overallrank,price,volumetradedinoneday } = recentLosers //destructuring
      return (
          <tr  className={signOutStyle.td} key={name}>
            <td>{name}</td>
            <td>-{onedaychange}</td>
            <td>{overallrank}</td>
            <td>{price}</td>
            <td>{volumetradedinoneday}</td>
          </tr>
      )
    })
    }
  return ( 
    <div className={signOutStyle.gainersCard}>
          <h5>Biggest Losers</h5>
          <h5>{dateUpdated}</h5>
          <div>
            <table className={signOutStyle.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>24H</th>
                <th>Rank</th>
                <th>Price</th>
                <th>Volume</th>
              </tr>
            </thead>
               <tbody>
                {renderTableDataLosers()}
               </tbody>
            </table>
         </div>
    </div>
  );
};
