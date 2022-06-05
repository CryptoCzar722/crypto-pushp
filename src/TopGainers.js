import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer"

export const TopGainers = () => {
  
  //application data
  const { logout, Moralis, user, ethAddress } = useMoralis();
  const [dateUpdated, setDateUpdated] = useState("");
  const [recentGainers, setRecentGainers] = useState([]);
  
  const queryRecentGainers = async ()=> {
    const query = new Moralis.Query("TopGainers");
    const topGs = await query.find();
    const topGsO = JSON.parse(topGs[0].attributes.TopGainers)
    setDateUpdated(new Date(topGs[0].attributes.updatedAt.toString()).toString());
    //console.log("topGs-> ",topGsO.result);
    setRecentGainers(topGsO.result)
  }

  useEffect(() => {
    queryRecentGainers();
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
  }, []);

  const renderTableDataGainers = () => {
    return recentGainers.map((recentGainers, index) => {
      const { name,onedaychange,overallrank,price,volumetradedinoneday } = recentGainers //destructuring
      return (
          <tr className={signOutStyle.td}  key={name}>
            <td>{name}</td>
            <td>{onedaychange}</td>
            <td>{overallrank}</td>
            <td>{price}</td>
            <td>{volumetradedinoneday}</td>
          </tr>
      )
    })
    }
  return ( 
    <div className={signOutStyle.gainersCard}>
          <h5>Biggest Gainers update </h5>
          <h5>{dateUpdated}</h5>
          <div>
            <table className={signOutStyle.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>24h</th>
                  <th>Rank</th>
                  <th>Price</th>
                  <th>Volume</th>
                </tr>
              </thead>

               <tbody>
                {renderTableDataGainers()}
               </tbody>
            </table>
         </div>
    </div>
  );
};
