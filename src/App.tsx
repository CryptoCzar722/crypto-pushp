import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MoralisProvider} from "react-moralis";
import { useState } from "react";
import SignIn from "./SignIn";
import { SignOut } from "./SignOut";
import  AlertsApp  from "./AlertsApp";
import styles from "./styles/Home.module.css";

function App() {
  return (
    <MoralisProvider serverUrl="https://tmplbudfhggp.usemoralis.com:2053/server" appId="zciDyDJrxgyMjOVHmbUo7IE8xtqxswlwZshrJRaz"> 
      <div><h1>Crypto-Push</h1></div>
      <AlertsApp/>
    </MoralisProvider>
  );
}

export default App;

/*
<div>
      <div className={styles.backgroundParent}>
        {isAuthenticated ? <SignOut /> : <SignIn />}
      </div>
    </div>
*/
