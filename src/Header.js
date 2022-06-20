
//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegNewspaper } from "react-icons/fa";
//import {IoNewspaper} from "react-icons/io";
import {AiOutlineCloud, AiOutlineLineChart, AiOutlineWallet} from "react-icons/ai";

import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { BiCog } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./styles/Header.css";
//import { SettingPage } from "twilio/lib/rest/insights/v1/setting";


const Header = (props) => {
    //const [page, setPage] = useState();

    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true)

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    console.log("menu clicked ")
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const menuSelected = (val) => {
    console.log(" value=> ", val);
    //props.setpage(event.target.value)

  }
  /*
  <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
  </SidebarFooter>
  */

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "C-P" : "Crypto-Push"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent >
            <Menu iconShape="square" onClick={event => event.preventDefault()}>
              <MenuItem active = {true} icon={<FiHome />} value={"home"} >Home</MenuItem>
              <MenuItem  active = {true} type="submit" icon={<AiOutlineLineChart />} value = {"dex"} >DEX</MenuItem>
              <MenuItem type="submit" icon={<FaRegNewspaper />} value={"news"} >News</MenuItem>
              <MenuItem type="submit" icon={<AiOutlineCloud />} value = {"alerts"}>Alerts</MenuItem>
              <MenuItem type="submit" icon={<AiOutlineWallet />} value = {"wallet"}>Wallet</MenuItem>
              <MenuItem type="submit" icon={<BiCog />} value = {"settings"}>Settings</MenuItem>
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
