import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer"


//must be last import
const axios = require("axios");

//import TradingViewWidget from 'react-tradingview-widget';

export const SignOut = () => {
  const options = {
    method: 'GET',
    url: 'https://fear-and-greed-index.p.rapidapi.com/v1/fgi',
    headers: {
      'X-RapidAPI-Host': 'fear-and-greed-index.p.rapidapi.com',
      'X-RapidAPI-Key': '5ef9e39a3bmsh53ec91281fe6737p1fb783jsnde933324d020'
    }
  };

  const optionsRecent = {
    method: 'GET',
    url: 'https://crypto-tracker.p.rapidapi.com/api/recentlyadded',
    headers: {
      'X-RapidAPI-Host': 'crypto-tracker.p.rapidapi.com',
      'X-RapidAPI-Key': '5ef9e39a3bmsh53ec91281fe6737p1fb783jsnde933324d020'
    }
  };
  const optionsLosers = {
    method: 'GET',
    url: 'https://crypto-tracker.p.rapidapi.com/api/toplosers',
    headers: {
      'X-RapidAPI-Host': 'crypto-tracker.p.rapidapi.com',
      'X-RapidAPI-Key': '5ef9e39a3bmsh53ec91281fe6737p1fb783jsnde933324d020'
    }
  };
  const optionsGainers = {
    method: 'GET',
    url: 'https://crypto-tracker.p.rapidapi.com/api/topgainers',
    headers: {
      'X-RapidAPI-Host': 'crypto-tracker.p.rapidapi.com',
      'X-RapidAPI-Key': '5ef9e39a3bmsh53ec91281fe6737p1fb783jsnde933324d020'
    }
  };
  const optionsTopCap = {
    method: 'GET',
    url: 'https://crypto-tracker.p.rapidapi.com/api/top10',
    headers: {
      'X-RapidAPI-Host': 'crypto-tracker.p.rapidapi.com',
      'X-RapidAPI-Key': '5ef9e39a3bmsh53ec91281fe6737p1fb783jsnde933324d020'
    }
  };
  
  const [greed, setGreed] = useState(0);
  const [greedText, setGreedText] = useState(0);
  const [recentCoins, setRecentCoins] = useState([]);
  const [recentLosers, setRecentLosers] = useState([]);
  const [recentGainers, setRecentGainers] = useState([]);
  const [top10, setTop10] = useState([]);
  
  
  useEffect(() => {
    axios.request(options).then(function (response) {
      setGreed(response.data.fgi.now.value)
      setGreedText(response.data.fgi.now.valueText)
      //console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
    //////////////////////////////////////////////////
    /*axios.request(optionsRecent).then(function (response) {
      //console.log(response.data.result);
      setRecentCoins(response.data.result);
    }).catch(function (error) {
      console.error(error);
    });
    //////////////////////////////////////////////////
    axios.request(optionsLosers).then(function (response) {
      //console.log(response.data.result);
      setRecentLosers(response.data.result);
    }).catch(function (error) {
      console.error(error);
    });
    /////////////////////////////////////////////////
    axios.request(optionsGainers).then(function (response) {
      //console.log(response.data.result);
      setRecentGainers(response.data.result)
    }).catch(function (error) {
      console.error(error);
    });
    ////////////////////////////////////////////////
    axios.request(optionsTopCap).then(function (response) {
      console.log(response.data.result);
      setTop10(response.data.result);
    }).catch(function (error) {
      console.error(error);
    });*/

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
  /* 
  circulation: "19,053,800 BTC"
  marketCap: "$584.89B$584,888,306,661"
  name: "Bitcoin"
  onedaychange: "5.06%"
  price: "$30,696.68"
  rank: "1"
  sevendayschange: "1.91%"
  volume: "$29,229,208,377952,195 BTC"
  */
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
                  <th>rank</th>
                  <th>name</th>
                  <th>marketCap</th>
                  <th>circulation</th>
                  <th>onedaychange</th>
                  <th>price</th>
                  <th>sevendayschange</th>
                  <th>volume</th>
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
             <th>name</th>
             <th>price</th>
             <th>hour</th>
             <th>day</th>
             <th>chain</th>
             <th>added</th>
             <th>marketcap</th>
             <th>volume</th>
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
              <th>name</th>
              <th>24h</th>
              <th>rank</th>
              <th>price</th>
              <th>volume</th>
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
              <th>name</th>
              <th>24h</th>
              <th>rank</th>
              <th>price</th>
              <th>volume</th>
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
