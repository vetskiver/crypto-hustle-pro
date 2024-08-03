import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const TopMarketCapList = () => {
  const [topMarketCapItems, setTopMarketCapItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendedCoins = async () => {
      const response = await fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&${API_KEY}`);

      const data = await response.json();
      const coins = data.Data ? Object.values(data.Data).map(item => item.CoinInfo) : [];
      setTopMarketCapItems(coins);
    };

    fetchRecommendedCoins().catch(console.error);
  }, []);

  return (
    <div>
      <h2>Top 10 Cryptos by Market Cap in USD</h2>
      <ul>
        {topMarketCapItems.map((coin) => (
          <li key={coin.Id} style={{ marginBottom: '20px' }}>
            <div style={{ width: '50px', height: '50px', overflow: 'hidden' }}>
              <img 
                src={`https://www.cryptocompare.com${coin.ImageUrl}`} 
                alt={`${coin.Name} logo`} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <a href={`https://www.cryptocompare.com${coin.Url}`} target="_blank" rel="noopener noreferrer">
              {coin.Name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopMarketCapList;