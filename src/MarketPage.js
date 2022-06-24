import React from 'react';

import { FearCard } from './FearCard';
import { NewCoinCard } from './NewCoinCard';
import { TopTen } from './TopTen';
import { TopGainers } from './TopGainers';
import { TopLosers } from './TopLosers';


export const MarketPage = () => {
  
return ( 
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
  );
};

