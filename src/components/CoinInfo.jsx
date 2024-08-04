import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol }) => {
    const [price, setPrice] = useState(null);

    useEffect(() => {

      const controller = new AbortController();
    
      const getCoinPrice = async () => {
        try {
          const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=` +
            API_KEY,
          { signal: controller.signal }
          );
          const json = await response.json();
          setPrice(json);
        } catch (error) {
          if (error.name === "AbortError") {
            // It's ok, don't do anything
          } else {
            console.error(error);
          }
        }
        
      };
    
      getCoinPrice();
      return () => controller.abort();
      
    }, [symbol]);

    return (
        <div>
          {price ? (
            <li className="main-list" key={symbol}>
                <img
                className="icons"
                src={`https://www.cryptocompare.com${image}`}
                alt={`Small icon for ${name} crypto coin`}
                />
                <Link
                  style={{ color: "White" }}
                  to={`/CoinDetails/${symbol}`}
                  key={symbol}
                >
                  {name} <span className="tab"></span> ${price.USD} USD
                </Link>
            </li>
          ) : 
          null
          }
        </div>
    );

};
  
export default CoinInfo;