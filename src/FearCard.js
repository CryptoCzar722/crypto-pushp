import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FearCard = () => {
  
  //application data
  const { logout, Moralis, user, ethAddress } = useMoralis();
  

  const [greed, setGreed] = useState(0);
  const [greedCard, setGreedCard] = useState("");
  const [greedText, setGreedText] = useState(0);
  const [dateUpdated, setDateUpdated] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [firstData, setFirstData] = useState(new Date());

  const queryFnG = async ()=> {
    const query = new Moralis.Query("FearGreed");
    const fng = await query.find();
    const fngO = JSON.parse(fng[fng.length -1].attributes.FearGreed)
    setDateUpdated(new Date(fng[fng.length -1].attributes.updatedAt.toString()).toString());
    setFirstData(new Date(fng[0].attributes.updatedAt.toString()).toString().slice(0,15));
    //console.log("FearGreed-> ", fngO.fgi.now.value);
    setGreedCard(fng);
    setGreed(fngO.fgi.now.value)
    setGreedText(fngO.fgi.now.valueText)
  }
  
  useEffect(() => {
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
    queryFnG();
  }, []);

  const FindDate = (date) => { 
    console.log(date.toString().slice(0,15)); 
    greedCard.forEach(element =>{
      //console.log("not found-> ",element.attributes.updatedAt.toString().slice(0,15))
      if (date.toString().slice(0,15) == element.attributes.updatedAt.toString().slice(0,15))
        {
        //console.log("found new coins by date -> ",element.attributes.updatedAt.toString().slice(0,15))
        //console.log("calendar newCoins-> ",element);
        const fng0 = JSON.parse(element.attributes.FearGreed)
        setDateUpdated((element.attributes.updatedAt.toString()).toString());
        setGreed(fng0.fgi.now.value)
        setGreedText(fng0.fgi.now.valueText)
        //setCardCoins(topLsO.result)  
        setStartDate(date)
      }
    })
  }

  return ( 
    <div className={signOutStyle.smallCard}>
          <div className={signOutStyle.divNewCoins}>Fear&Greed Index</div>
          <DatePicker 
          className={signOutStyle.calendar} 
          startDate = {new Date(firstData)}
          endDate = {new Date(startDate)}
          selected={startDate} 
          onChange={(date) => FindDate(date)} />
          <h5>{dateUpdated}</h5>
          <p>{greedText}</p>
          <ReactSpeedometer
            maxValue={100}
            value={greed}
            needleColor="black"
            startColor="red"
            segments={7}
            endColor="green"
          />
        </div>
  );
};
