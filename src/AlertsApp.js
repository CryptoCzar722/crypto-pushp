import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useMoralis} from "react-moralis";
import { useState } from "react";
import SignIn from "./SignIn";
import { SignOut } from "./SignOut";

import styles from "./styles/Home.module.css";

function AlertsApp() {
    const {isAuthenticated} = useMoralis();

    return (
        
        <div>
        <div className={styles.backgroundParent}>
            {isAuthenticated ? <SignOut /> : <SignIn />}
        </div>
        </div>
        
    );
}

export default AlertsApp;
