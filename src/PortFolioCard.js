import React from 'react';
import { useMoralis } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import styles from "./styles/Home.module.css";
import { useEffect, useState } from "react";
import { FaBan } from 'react-icons/fa';

//must be last import
const axios = require("axios");
/*
curl -X 'GET' \
  'https://deep-index.moralis.io/api/v2/0x3B7Be8B0a1538d41B2D9784327CB951ee74D7D4E/erc20?chain=0x38' \
  -H 'accept: application/json' \
  -H 'X-API-Key: ZwRSxOl8dC52wkmj42u34rKl92UimdHvbO1kg1oVXktQ5fHKprjNvHl3zbCbiUuW'

*/

/*
curl -X 'GET' \
  'https://deep-index.moralis.io/api/v2/erc20/0x4e3cabd3ad77420ff9031d19899594041c420aee/price?chain=0x38' \
  -H 'accept: application/json' \
  -H 'X-API-Key: ZwRSxOl8dC52wkmj42u34rKl92UimdHvbO1kg1oVXktQ5fHKprjNvHl3zbCbiUuW'
*/

export const PortFolioCard = () => {

  const [balanceERC20, setBalanceERC20] = useState([]);
  const [dateUpdated, setDateUpdated] = useState("");
  const[addressPrice,setAddressPrice] = useState("");
  const[price,setPrice] = useState("");
  const[tokenArray,setTokenArray] = useState([]);
  const[tokenBalanceArray,setTokenBalanceArray] = useState([]);
  const[tokenDecArray,setTokenDecArray] = useState([]);
  const[totalBalance,setTotalBalance] = useState(0);

  const optionsERC20 = {
    method: 'GET',
    url: 'https://deep-index.moralis.io/api/v2/0x3B7Be8B0a1538d41B2D9784327CB951ee74D7D4E/erc20?chain=0x38',
    headers: {
      'accept': 'application/json',
      'X-API-Key': 'ZwRSxOl8dC52wkmj42u34rKl92UimdHvbO1kg1oVXktQ5fHKprjNvHl3zbCbiUuW'
    }
  };

  //application data
  const { isAuthenticated, logout, Moralis, user, ethAddress, authenticate, authError, isAuthenticating } = useMoralis();

  const handleCustomLogin = async () => {
    await authenticate({
      provider: "web3Auth",
      clientId: "BN-6dNNgKK_DJmhff63kvmqoyfUMVTEYdjRbp_pIZCvdPmj69n94pHl4rVCymrqmuUQAnB91e-5Go2TA2LzSdyM",
      chainId: Moralis.Chains.BNB,
      theme: 'dark',
      appLogo: "",
      logingMethodsOrder : ["google", "facebook", "twitter"]//, "reddit", "discord", "twitch", "apple", "github", "linkedin", "email_passwordless"]
    });
  };

  useEffect(() => {
    //console.log("swap card is authenticated ->", isAuthenticated);
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
    axios.request(optionsERC20).then(function (response) {
        //console.log("portfolio->",response.data);
        setBalanceERC20(response.data);
        //console.log("response.data.length->",response.data.length);
        (response.data).forEach(element => {
          //console.log(tokenArray.length,"token_address->",element)
          const portfolioData = {
            name : element.name,
            address : element.token_address,
            balance : element.balance,
            decimals : element.decimals
          }
          tokenArray.push(portfolioData)
        });
        
        //let dateNow = "1:05 AM";//new Date();
        //setDateUpdated(dateNow);
      }).catch(function (error) {
        console.error(error);
      }).then(()=>{
          tokenArray.forEach(element => {
                //console.log(tokenArray.length,"address->",element)
                const optionsERC20Price = {
                  method: 'GET',
                  url: `https://api.pancakeswap.info/api/v2/tokens/${element.address}`,
                  headers: {
                    'accept': 'application/json',
                  }
                };
                //console.log("query->",optionsERC20Price)
                const formattedBalance = element.decimals == "18" ? Moralis.Units.FromWei(element.balance) : Moralis.Units.FromWei(element.balance, element.decimals);
                if (formattedBalance % 1 != 0){
                    //console.log(element.name, " formattedBalance ",formattedBalance);
                    axios.request(optionsERC20Price).then(function (response) {
                        if (response.data.data.price > 0 && element.address != "0xba96731324de188ebc1ed87ca74544ddebc07d7f"){
                          //console.log("balanceERC20Price data->",response.data.data.name,response.data.data.price);
                          let userBal = Number(formattedBalance * parseFloat(response.data.data.price));                        
                          console.log(element.address,element.name, " USD ",typeof(userBal), totalBalance);
                          setTotalBalance(totalBalance+userBal)
                        }
                      }).catch(function (error) {
                        console.error(error);
                      });
                    }
          });
  });
    //fetchBalance();
   }, []);
   /*
 balanceERC20.forEach(element  => {
          console.log("element.token_address->",element.token_address);
          /*const optionsERC20Price = {
            method: 'GET',
            url: `https://deep-index.moralis.io/api/v2/erc20/${element.token_address}/price?chain=0x38`,
            headers: {
              'accept': 'application/json',
              'X-API-Key': 'ZwRSxOl8dC52wkmj42u34rKl92UimdHvbO1kg1oVXktQ5fHKprjNvHl3zbCbiUuW'
            }
          };
          axios.request(optionsERC20Price).then(function (response) {

          console.log("balanceERC20Price->",response.data);

        }).catch(function (error) {
          console.error(error);
        });
      })
   */

/*
balance: "2907"
decimals: 5
logo: null
name: "Safuu"
symbol: "SAFUU"
thumbnail: null
token_address: "0xe5ba47fd94cb645ba4119222e34fb33f59c7cd90"
*/

const renderTableDataPortfolio = () => {
    return balanceERC20.map((balanceERC20, index) => {
    const { balance,decimals,logo,name,symbol,thumbnail,token_address} = balanceERC20 //destructuring 
    return (
          <tr className={signOutStyle.td}  key={token_address}>
            <td>{name}</td>
            <td>{symbol}</td>
            <td>{decimals == "18" ? Moralis.Units.FromWei(balance) : Moralis.Units.FromWei(balance, decimals)}</td>
            <td>{parseFloat(decimals)}</td>
            <td>{token_address}</td>
          </tr>
      )
    })
    }
/*
            <div className={signOutStyle.swapCardMini}>
            </div>

              {
                    isAuthenticated
                    ?

                    :
                    <>
                    <FaBan className={signOutStyle.iErrorPortfolio} />
                    <h4 className={signOutStyle.hErrorPortfolio}> Login for Portfolio </h4>
                    </>
                } 
*/
  return ( 
    <div className={signOutStyle.portfolioCard}>
        <div>
            <h5 className= {signOutStyle.hTop10}> Portfolio ${totalBalance}</h5>
                    <div>
                            <table className={signOutStyle.table}>
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>symbol</th>
                                    <th>balance</th>
                                    <th>decimals</th>
                                    <th>token_address</th>
                                </tr>
                            </thead>
                            <tbody >
                                {renderTableDataPortfolio()}
                            </tbody>
                            </table>
                    </div> 
                    
        </div>
    </div>

  );
};
