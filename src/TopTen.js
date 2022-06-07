import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
//import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
//
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const TopTen = () => {
  
  //application data
  const { logout, Moralis, user, ethAddress } = useMoralis();
  
  const [balance,setBalance] = useState("");  
  const [dateUpdated, setDateUpdated] = useState("");
  const [top10, setTop10] = useState([]);
  const [cardCoins, setCardCoins] = useState([]);
  //const [card, setCard] = useState(0);
  const [startDate, setStartDate] = useState(new Date());

  const queryTop10 = async ()=> {
    const query = new Moralis.Query("Top10");
    const top10 = await query.find();
    const top10O = JSON.parse(top10[top10.length-1].attributes.Top10)
    setDateUpdated(top10[top10.length-1].attributes.updatedAt.toString());
    //console.log("top10-> ",top10O.result);
    //setTop10(top10O.result)
    setTop10(top10)
    setCardCoins(top10O.result)
  }

  useEffect(() => {
    queryTop10();
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
  }, []);


const renderTableDataTop10 = () => {
    return cardCoins.map((top10, index) => {
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
    const FindDate = (date) => { 
      console.log(date.toString().slice(0,15)); 
      top10.forEach(element =>{
        //console.log("not found-> ",element.attributes.updatedAt.toString().slice(0,15))
        if (date.toString().slice(0,15) == element.attributes.updatedAt.toString().slice(0,15))
          {
          //console.log("found new coins by date -> ",element.attributes.updatedAt.toString().slice(0,15))
          //console.log("calendar newCoins-> ",element);
          const top10O = JSON.parse(element.attributes.Top10)
          setDateUpdated((element.attributes.updatedAt.toString()).toString());
          setCardCoins(top10O.result)  
        }
      })
      setStartDate(date)
    }
    
  return ( 
    <div className={signOutStyle.top10Card}>
      <div className={signOutStyle.divNewCoins}>Top 10 </div>
      <DatePicker className={signOutStyle.calendar} selected={startDate} onChange={(date) => FindDate(date)} />
      <h5>{dateUpdated}</h5>
        <div>
                <table className={signOutStyle.table} >
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Market Cap.</th>
                      <th>Circulation</th>
                      <th>1D</th>
                      <th>Price</th>
                      <th>7D</th>
                      <th>Volume</th>
                    </tr>
                  </thead>
                  <tbody >
                    {renderTableDataTop10()}
                  </tbody>
                </table>
        </div>    
      </div>
  );
};
