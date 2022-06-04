import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer"
//must be last import
//const axios = require("axios");
//import TradingViewWidget from 'react-tradingview-widget';

export const SignOut = () => {

  const [greed, setGreed] = useState(0);
  const [greedText, setGreedText] = useState(0);
  const [recentCoins, setRecentCoins] = useState([]);
  const [recentLosers, setRecentLosers] = useState([]);
  const [recentGainers, setRecentGainers] = useState([]);
  const [top10, setTop10] = useState([]);
  
  const queryFnG = async ()=> {
    const query = new Moralis.Query("FearGreed");
    const fng = await query.find();
    const fngO = JSON.parse(fng[0].attributes.FearGreed)
    //console.log("FearGreed-> ", fngO.fgi.now.value);
    setGreed(fngO.fgi.now.value)
    setGreedText(fngO.fgi.now.valueText)
  }
  const queryTop10 = async ()=> {
    const query = new Moralis.Query("Top10");
    const top10 = await query.find();
    const top10O = JSON.parse(top10[0].attributes.Top10)
    //console.log("top10-> ",top10O.result);
    setTop10(top10O.result)
  }
  const queryRecentGainers = async ()=> {
    const query = new Moralis.Query("TopGainers");
    const topGs = await query.find();
    const topGsO = JSON.parse(topGs[0].attributes.TopGainers)
    //console.log("topGs-> ",topGsO.result);
    setRecentGainers(topGsO.result)
  }
  const queryRecentLosers = async ()=> {
    const query = new Moralis.Query("TopLosers");
    const topLs = await query.find();
    const topLsO = JSON.parse(topLs[0].attributes.TopLosers)
    //console.log("topLs-> ",topLsO.result);
    setRecentLosers(topLsO.result)
  }

  const queryRecentCoins = async ()=> {
    const query = new Moralis.Query("NewCoins");
    const newCoins = await query.find();
    const newCoinsO = JSON.parse(newCoins[0].attributes.NewCoins)
    console.log("newCoins-> ",newCoinsO.result);
    setRecentCoins(newCoinsO.result)
  }

  useEffect(() => {    
    queryFnG();
    queryTop10();
    queryRecentGainers();
    queryRecentLosers();
    queryRecentCoins();
  }, []);

  const { logout, Moralis, user, ethAddress } = useMoralis();
  const [balance, setBalance] = useState(0);
  const [viewKey, setviewKey] = useState(0);
  const [alertCoin, setAlertCoin] = useState("BTC");

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
  }, []);

  const handleTransfer = async () => {
    try {
      await Moralis.transfer({
        amount: Moralis.Units.ETH("0.1"),
        receiver: "",
        type: "native",
      }).then((e) => {
        alert("sucesfully transfered");
      });
      await fetchBalance();
    } catch {}
  };

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
 const renderTableDataLosers = () => {
  return recentLosers.map((recentLosers, index) => {
    const { name,onedaychange,overallrank,price,volumetradedinoneday } = recentLosers //destructuring
    return (
        <tr  className={signOutStyle.td} key={name}>
          <td>{name}</td>
          <td>{onedaychange}</td>
          <td>{overallrank}</td>
          <td>{price}</td>
          <td>{volumetradedinoneday}</td>
        </tr>
    )
  })
  }
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
    <div>
      <div>
        <div className={signOutStyle.signOutCard}>
          <h4>CrypoPush Alerts (Built with Moralis x Web3Auth!)</h4>
          <button className={`${signOutStyle.refresh}`} onClick={fetchBalance}>
            Refresh
          </button>
        <p className={signOutStyle.subHeader}>Details:</p>
          <div className={signOutStyle.detailsDiv}>
          <div>
            <h5>Account:</h5>
            <p>{user.attributes.accounts}</p>
          </div>
          <div className={signOutStyle.pTextHidden} >
            <h5>Private Key:</h5>
              <p className={signOutStyle.pTextHidden}> {user.attributes.authData.moralisEth.signature}</p>
          </div>
          <div>
            <h5>Balance (Eth)</h5>
            <p>{balance} </p>
          </div>

        <div className={signOutStyle.fotter}>
          <button className={styles.loginButton} onClick={handleTransfer}>
            Test Transfer
          </button>
          <button className={styles.loginButton} onClick={logout}>
            Sign Out
          </button>
        </div>
      </div>
    </div>

    <div className={signOutStyle.alertCard}>
      <h4> Alerts </h4>
        <div>
               
        </div>    
      </div>
    </div>

    <div>
      
    <div className={signOutStyle.top10Card}>
      <h4> Top 10 </h4>
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
    </div>
    <div className={signOutStyle.smallCard}>
          <h5>Fear&Greed Index</h5>
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
    <div className={signOutStyle.medCard}>
          <h5>New Projects</h5>
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
    <div>
    <div className={signOutStyle.gainersCard}>
          <h5>Biggest Losers</h5>
          <div>
            <table className={signOutStyle.table}>
            <thead>
              <th>Name</th>
              <th>24H</th>
              <th>Rank</th>
              <th>Price</th>
              <th>Volume</th>
              </thead>
               <tbody>
                {renderTableDataLosers()}
               </tbody>
            </table>
         </div>
    </div>
    <div className={signOutStyle.gainersCard}>
          <h5>Biggest Gainers</h5>
          <div>
            <table className={signOutStyle.table}>
              <thead>
              <th>Name</th>
              <th>24h</th>
              <th>Rank</th>
              <th>Price</th>
              <th>Volume</th>
              </thead>

               <tbody>
                {renderTableDataGainers()}
               </tbody>
            </table>
         </div>
    </div>
    </div>
    </div>
  );
};
