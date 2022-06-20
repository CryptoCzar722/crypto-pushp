import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
//
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const TopLosers = () => {
  
  //application data
  const { logout, Moralis, user, ethAddress } = useMoralis();
  const [dateUpdated, setDateUpdated] = useState("");
  const [recentLosers, setRecentLosers] = useState([]);
  const [cardCoins, setCardCoins] = useState([]);
  const [card, setCard] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [firstData, setFirstData] = useState(new Date());
  
  const queryRecentLosers = async ()=> {
    const query = new Moralis.Query("TopLosers");
    const topLs = await query.find();
    const topLsO = JSON.parse(topLs[topLs.length-1].attributes.TopLosers)
    setDateUpdated(new Date(topLs[topLs.length-1].attributes.updatedAt.toString()).toString());
    setFirstData(new Date(topLs[0].attributes.updatedAt.toString()).toString().slice(0,15));
    //console.log("topLs-> ",topLsO.result);
    //setRecentLosers(topLsO.result)
    setCardCoins(topLsO.result)
    setRecentLosers(topLs)
  }

  useEffect(() => {
    queryRecentLosers();
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
  }, []);

  const renderTableDataLosers = () => {
    return cardCoins.map((recentLosers, index) => {
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

    const FindDate = (date) => { 
      console.log(date.toString().slice(0,15)); 
      recentLosers.forEach(element =>{
        //console.log("not found-> ",element.attributes.updatedAt.toString().slice(0,15))
        if (date.toString().slice(0,15) == element.attributes.updatedAt.toString().slice(0,15))
          {
          //console.log("found new coins by date -> ",element.attributes.updatedAt.toString().slice(0,15))
          //console.log("calendar newCoins-> ",element);
          const topLsO = JSON.parse(element.attributes.TopLosers)
          setDateUpdated((element.attributes.updatedAt.toString()).toString());
          setCardCoins(topLsO.result)  
          setStartDate(date)
        }
      })
    }
  return ( 
    <div className={signOutStyle.losersCard}>
          <div className={signOutStyle.divNewCoins}>Biggest Losers </div>
          <DatePicker 
          className={signOutStyle.calendar} 
          selected={startDate} 
          startDate = {new Date(firstData)}
          endDate = {new Date(startDate)}
          onChange={(date) => FindDate(date)} />
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
