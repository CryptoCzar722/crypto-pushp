import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer"

export const FearCard = () => {
  
  //application data
  const { logout, Moralis, user, ethAddress } = useMoralis();
  

  const [greed, setGreed] = useState(0);
  const [greedText, setGreedText] = useState(0);
  const [dateUpdated, setDateUpdated] = useState("");

  const queryFnG = async ()=> {
    const query = new Moralis.Query("FearGreed");
    const fng = await query.find();
    const fngO = JSON.parse(fng[0].attributes.FearGreed)
    setDateUpdated(new Date(fng[0].attributes.updatedAt.toString()).toString());
    //console.log("FearGreed-> ", fngO.fgi.now.value);
    setGreed(fngO.fgi.now.value)
    setGreedText(fngO.fgi.now.valueText)
  }
  
  useEffect(() => {
    queryFnG();
  }, []);

  return ( 
    <div className={signOutStyle.smallCard}>
          <h5>Fear&Greed Index</h5>
          <h7>{dateUpdated}</h7>
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
