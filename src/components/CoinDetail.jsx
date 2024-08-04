import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinChart from "./CoinChart";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetail = () => {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getCoinDetail = async () => {
      try {
        const details = await fetch(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=${API_KEY}`
        );
        const description = await fetch(
          `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=${API_KEY}`
        );

        const detailsJson = await details.json();
        const descripJson = await description.json();

        setFullDetails({
          numbers: detailsJson.DISPLAY,
          textData: descripJson.Data
        });
      } catch (error) {
        console.error("Error fetching coin details:", error);
      }
    };

    getCoinDetail();
  }, [params.symbol]);

  if (!fullDetails) {
    return <div>Loading...</div>;
  }

  const coinDetails = fullDetails.textData[params.symbol];
  const coinPrice = fullDetails.numbers[params.symbol].USD;

  return (
    <div>
      <h1>{coinDetails.FullName}</h1>
      <img
        className="images"
        src={`https://www.cryptocompare.com${coinPrice.IMAGEURL}`}
        alt={`Small icon for ${params.symbol} crypto coin`}
      />
      <div>{coinDetails.Description}</div>
      <br />
      <div>
        This coin was built with the algorithm {coinDetails.Algorithm}
      </div>

      <table>
        <tbody>
          <tr>
            <th>Launch Date</th>
            <td>{coinDetails.AssetLaunchDate || "N/A"}</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>
              <a href={coinDetails.WebsiteUrl} target="_blank" rel="noopener noreferrer">
                {coinDetails.WebsiteUrl || "N/A"}
              </a>
            </td>
          </tr>
          <tr>
            <th>Whitepaper</th>
            <td>
              <a href={coinDetails.Whitepaper} target="_blank" rel="noopener noreferrer">
                {coinDetails.Whitepaper || "N/A"}
              </a>
            </td>
          </tr>
          <tr>
            <th>Monetary Symbol</th>
            <td>{coinDetails.Symbol || "N/A"}</td>
          </tr>
          <tr>
            <th>Market</th>
            <td>{coinPrice.MARKET || "N/A"}</td>
          </tr>
          <tr>
            <th>Last Transaction</th>
            <td>{coinPrice.LASTUPDATE || "N/A"}</td>
          </tr>
          <tr>
            <th>Last Transaction Value</th>
            <td>{coinPrice.PRICE || "N/A"}</td>
          </tr>
          <tr>
            <th>Volume</th>
            <td>{coinPrice.VOLUME24HOUR || "N/A"}</td>
          </tr>
          <tr>
            <th>Today's Open Price</th>
            <td>{coinPrice.OPENDAY || "N/A"}</td>
          </tr>
          <tr>
            <th>Highest Price during the Day</th>
            <td>{coinPrice.HIGHDAY || "N/A"}</td>
          </tr>
          <tr>
            <th>Lowest Price during the Day</th>
            <td>{coinPrice.LOWDAY || "N/A"}</td>
          </tr>
          <tr>
            <th>Change from Previous Day</th>
            <td>{coinPrice.CHANGE24HOUR || "N/A"}</td>
          </tr>
          <tr>
            <th>Market Cap</th>
            <td>{coinPrice.MKTCAP || "N/A"}</td>
          </tr>
        </tbody>
      </table>
      <CoinChart symbol={params.symbol} market={coinPrice.MARKET} />
    </div>
  );
};

export default CoinDetail;