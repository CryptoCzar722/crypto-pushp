import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useMoralis} from "react-moralis";
import { useState } from "react";
import SignIn from "./SignIn";
import { SignOut } from "./SignOut";

import styles from "./styles/Home.module.css";
import { TickerTape } from "react-ts-tradingview-widgets";
//{isAuthenticated ? <SignOut /> : <SignIn />}
//import { Timeline } from "react-ts-tradingview-widgets";
//<Timeline colorTheme="light"  feedMode="market" market="crypto" height={400} width="50%"></Timeline>
function AlertsApp() {
    const {isAuthenticated, Moralis} = useMoralis();
    return (
        <div>
            <div className={styles.backgroundParent}>
            <SignOut />
            </div>
        </div>
        
    );
}

export default AlertsApp;
