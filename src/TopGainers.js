import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
//
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const TopGainers = () => {
  
  //application data
  const { logout, Moralis, user, ethAddress } = useMoralis();
  const [dateUpdated, setDateUpdated] = useState("");
  const [recentGainers, setRecentGainers] = useState([]);
  const [cardCoins, setCardCoins] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const queryRecentGainers = async ()=> {
    const query = new Moralis.Query("TopGainers");
    const topGs = await query.find();
    const topGsO = JSON.parse(topGs[topGs.length -1].attributes.TopGainers)
    setDateUpdated(new Date(topGs[topGs.length -1].attributes.updatedAt.toString()).toString());
    //console.log("topGs-> ",topGsO.result);
    //setRecentGainers(topGsO.result)
    setCardCoins(topGsO.result)
    setRecentGainers(topGs)
  }

  useEffect(() => {
    queryRecentGainers();
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
  }, []);

  const renderTableDataGainers = () => {
    return cardCoins.map((cardCoins, index) => {
      const { name,onedaychange,overallrank,price,volumetradedinoneday } = cardCoins //destructuring
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
  
  const FindDate = (date) => { 
      console.log(date.toString().slice(0,15)); 
      recentGainers.forEach(element =>{
        //console.log("not found-> ",element.attributes.updatedAt.toString().slice(0,15))
        if (date.toString().slice(0,15) == element.attributes.updatedAt.toString().slice(0,15))
          {
          //console.log("found new coins by date -> ",element.attributes.updatedAt.toString().slice(0,15))
          //console.log("calendar newCoins-> ",element);
          const topGsO = JSON.parse(element.attributes.TopGainers)
          setDateUpdated((element.attributes.updatedAt.toString()).toString());
          setCardCoins(topGsO.result)  
        }
      })
      setStartDate(date)
    }
  return ( 
    <div className={signOutStyle.gainersCard}>
          <div className={signOutStyle.divNewCoins}>Biggest Gainers </div>
          <DatePicker className={signOutStyle.calendar} selected={startDate} onChange={(date) => FindDate(date)} />
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
