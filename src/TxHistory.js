import React from 'react';
import { useMoralis,useMoralisWeb3Api } from "react-moralis";
import signOutStyle from "./styles/SignOut.module.css";
import { useEffect, useState } from "react";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import TableScrollbar from 'react-table-scrollbar';

import Pdf from "react-to-pdf";

import { CSVLink,CSVDownload } from "react-csv";

//import json2csv from "json2csv";


export const TxHistory = () => {

    const headers = [
        { label: "address", key: "address" },
        { label: "block_hash", key: "block_hash" },
        { label: "block_number", key: "block_number" },
        { label: "block_timestamp", key: "block_timestamp" },
        { label: "from_address", key: "from_address" },
        { label: "to_address", key: "to_address" },
        { label: "transaction_hash", key: "transaction_hash" },
        { label: "value", key: "value" }
      ];

    const { account } = useMoralisWeb3Api();
    //application data
    const { isAuthenticated, Moralis, user, ethAddress } = useMoralis();
    //const [ERC20Transfers, setERC20Transfers] = useState();
    //const [showModal, setShowModal] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState(false);
    const [txSelected, setTxSelected] = useState(false);
    //const [csvReport,setCsvReport] = useState("none");

    const fetchERC20Transfers = async () => {
        return await account
            .getTokenTransfers({ address: user.attributes.accounts, chain: 'bsc' })
            .then((result) => {
            setTransactionDetails(result.result)
            setTxSelected(result.result[0]) //result.result.length 
            //console.log("TX history length", (result.result.length))
            console.log("TX history ", (result.result))
            //let array = Object.keys(result.result).map((key) => [Number(key), result.result[key]]);
            //console.log("TX history json", JSON.stringify(result.result))
            })
            .catch((e) => alert(e.message));
        };

        const renderTableTransactions = () => {
            return Object.keys(transactionDetails).map((key, index) => {
              //const { address,block_hash, block_number,block_timestamp,from_address,to_address,transaction_hash, value} = transactionDetails //destructuring
              return (
                  <>
                  <tr className={signOutStyle.tdHistory}  key={key}>
                    <td>{transactionDetails[key].address}</td>
                    <td>{transactionDetails[key].block_hash}</td>
                    <td>{transactionDetails[key].block_number}</td>
                    <td>{transactionDetails[key].block_timestamp}</td>
                    <td>{transactionDetails[key].from_address}</td>
                    <td>{transactionDetails[key].to_address}</td>
                    <td>{transactionDetails[key].transaction_hash}</td>
                    <td>{transactionDetails[key].value}</td>
                  </tr>
                </>
              )
            })
            }

            const renderDropDownTransactions = () => {
                return Object.keys(transactionDetails).map((key, index) => {
                  //const { address,block_hash, block_number,block_timestamp,from_address,to_address,transaction_hash, value} = transactionDetails //destructuring
                  return (  
                    <option key={key} value={index}>{transactionDetails[key].block_timestamp}</option>
                  )
                })
                }
   
  useEffect(() => {
    Moralis.start({"appId" : "zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz","serverUrl" : "https://tmplbudfhggp.usemoralis.com:2053/server"});
    //console.log("history isAuthenticated ? ",isAuthenticated);
    fetchERC20Transfers()
   /* setCsvReport({
        data: transactionDetails,
        headers: headers,
        filename: `Crypto_Push_taxes_${user.attributes.accounts}.csv`
        })*/
  }, []);

  /*const ref = React.createRef();
  <Pdf targetRef={ref} filename={`${user.attributes.accounts}_onchain_history.pdf`}>
                    {({toPdf}) => (
                        <button onClick={toPdf}>Download to PDF/CSV coming soon</button>
                    )}
                </Pdf>
                */
  return ( 
        <div className={isMobile == false ? signOutStyle.NewsCard :  signOutStyle.NewsCardMobile}>
            <h4 className={signOutStyle.hNews}> Transaction History </h4>
            <h5>Account Address : {user.attributes.accounts}</h5>
            <hr
                style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 1
                }}
            />
            <div>
                <CSVLink data = {JSON.stringify(transactionDetails)[0]}>Export to CSV</CSVLink>
            </div>
            <hr
                style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 1
                }}
            />
            <select  className={signOutStyle.sTransactions} onChange ={ (event) => { 
                setTxSelected(transactionDetails[event.target.value]) 
                //FindToken(event.target.value) 
                console.log("add modal for tx here", event.target.value)
                }}>
                {renderDropDownTransactions()}
              </select> 
              <hr
                style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 1
                }}
            />
              <h4 className={signOutStyle.hNews}> {txSelected.to_address == user.attributes.accounts  ? "Crypto Received" : txSelected.from_address == user.attributes.accounts  ? "Crypto Sent" : "Direction unknown!"} </h4>
              <hr
                style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 1
                }}
            />
             <div>
              <span className= {signOutStyle.hPortL}>Block Timestamp : </span> 
              <span className= {signOutStyle.hPortR}> {txSelected.block_timestamp}</span> 
            </div> 
            <hr
                style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 1
                }}
            />
              <div>
              <span className= {signOutStyle.hPortL}>Coin Address : </span> 
              <span className= {signOutStyle.hPortR}> {txSelected.address}</span> 
              </div> 
            <hr
                style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 1
                }}
            />
            <div>
              <span className= {signOutStyle.hPortL}>Block Hash : </span> 
              <span className= {signOutStyle.hPortR}> {txSelected.block_hash}</span> 
            </div>  
            <hr
                style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 1
                }}
            />
            <div>
              <span className= {signOutStyle.hPortL}>From Address : </span> 
              <span className= {signOutStyle.hPortR}> {txSelected.from_address}</span> 
            </div>  
            <hr
                style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 1
                }}
            />
            <div>
              <span className= {signOutStyle.hPortL}>To Address : </span> 
              <span className= {signOutStyle.hPortR}> {txSelected.to_address}</span> 
            </div>  
            <hr
                style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 1
                }}
            />
            <div>
              <span className= {signOutStyle.hPortL}>Transaction Hash : </span> 
              <span className= {signOutStyle.hPortR}> {txSelected.transaction_hash}</span> 
            </div>  
            <hr
                style={{
                    color: "black",
                    backgroundColor: "black",
                    height: 1
                }}
            />
            <div>
              <span className= {signOutStyle.hPortL}>Amount : </span> 
              <span className= {signOutStyle.hPortR}> {txSelected.value}</span> 
            </div>  
        </div>  
  );
};

/*className={signOutStyle.table}*/
/*
<TableScrollbar rows={15}>
            <table  ref={ref}>
            <thead>
            <tr className={signOutStyle.tdHistory}>
                <th>address</th>
                <th>block_hash</th>
                <th>block_number</th>
                <th>block_timestamp</th>
                <th>from_address</th>
                <th>to_address</th>
                <th>transaction_hash</th>
                <th>value</th>
            </tr>
          </thead>

           <tbody>
            {renderTableTransactions()}
           </tbody>
        </table>
        </TableScrollbar>
*/