import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
//
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const NewCoinCard = () => {
  
  //application data
  const { logout, Moralis, user, ethAddress } = useMoralis();
  const [dateUpdated, setDateUpdated] = useState("");
  const [recentCoins, setRecentCoins] = useState([]);
  const [cardCoins, setCardCoins] = useState([]);
  const [card, setCard] = useState(0);
  const [startDate, setStartDate] = useState(new Date());

  const queryRecentCoins = async ()=> {
    const query = new Moralis.Query("NewCoins");
    const newCoins = await query.find();
    //console.log("typeof(newCoins)-> ",newCoins.length);
    const newCoinsO = JSON.parse(newCoins[newCoins.length-1].attributes.NewCoins)
    //console.log("newCoins-> ",newCoins[newCoins.length-1]);
    setDateUpdated((newCoins[newCoins.length-1].attributes.updatedAt.toString()).toString());
    setCardCoins(newCoinsO.result)
    setRecentCoins(newCoins)
  }
  
  useEffect(() => {
    queryRecentCoins();
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
  }, []);

//newest coinmarketcap coins
const renderTableData = () => {
    return cardCoins.map((cardCoins, index) => {
       const { Blockchain, added, marketCap, volume, rank, name, price,onehourchange,onedaychange} = cardCoins //destructuring
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
  const updateCardData = () => {
    if (card >= (recentCoins.length-1)){
      setCard(recentCoins.length-1)
      return;
    }
    setCard(card+1)

    const newCoinsO = JSON.parse(recentCoins[card].attributes.NewCoins)
    console.log("inc newCoins-> ",recentCoins[card]);
    setDateUpdated((recentCoins[card].attributes.updatedAt.toString()).toString());
    setCardCoins(newCoinsO.result) 
  }

  const updateCardDataDown = () => {
    if (card <= 0){
      setCard(0)
      return;
    }
    setCard(card-1)
    
    const newCoinsO = JSON.parse(recentCoins[card].attributes.NewCoins)
    console.log("newCoins-> ",recentCoins[card]);
    setDateUpdated((recentCoins[card].attributes.updatedAt.toString()).toString());
    setCardCoins(newCoinsO.result)
    
  }
  const FindDate = (date) => { 
    console.log(date.toString().slice(0,15)); 
    recentCoins.forEach(element =>{
      //console.log("not found-> ",element.attributes.updatedAt.toString().slice(0,15))
      if (date.toString().slice(0,15) == element.attributes.updatedAt.toString().slice(0,15))
        {
        //console.log("found new coins by date -> ",element.attributes.updatedAt.toString().slice(0,15))
        //console.log("calendar newCoins-> ",element);
        const newCoinsO = JSON.parse(element.attributes.NewCoins)
        setDateUpdated((element.attributes.updatedAt.toString()).toString());
        setCardCoins(newCoinsO.result)  
      }
    })
    setStartDate(date)
  }
  /*
  <button className={styles.newcoinArrowButtonR}  onClick={() => {updateCardData()  }}>
            {"<"}
      </button>
      <button className={styles.newcoinArrowButtonL}  onClick={() => { updateCardDataDown() }}>
                  {">"}
      </button>
  */
  return ( 
    <div className={signOutStyle.medCard}>
    <div className={signOutStyle.divNewCoins}>New Projects</div>
      <DatePicker className={signOutStyle.calendar} selected={startDate} onChange={(date) => FindDate(date)} />
      <h5 className={styles.hNewCoin}>{dateUpdated} </h5>
          <div>
            <table className={signOutStyle.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>1H</th>
                <th>1D</th>
                <th>Chain</th>
                <th>Added</th>
                <th>Market Cap.</th>
                <th>Volume</th>
              </tr>
            </thead>
               <tbody >
                {renderTableData()}
               </tbody>
            </table>
           
         </div>
    </div>
    
  );
};
