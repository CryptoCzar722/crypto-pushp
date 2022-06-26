import React from 'react';

import { FearCard } from './FearCard';
import { NewCoinCard } from './NewCoinCard';
import { TopTen } from './TopTen';
import { TopGainers } from './TopGainers';
import { TopLosers } from './TopLosers';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

export const MarketPage = () => {
  
return ( 
    <>  
      {
        isMobile
        ?
        <h5>Mobile View Coming Soon</h5>
        :
        <>
              <div>
                <FearCard/>
                <NewCoinCard/>
              </div>
              <div>
                <TopTen/>
              </div>  
              <div>
                <TopLosers/>
                <TopGainers/>
              </div>
        </>
      }
    </>
  );
};

