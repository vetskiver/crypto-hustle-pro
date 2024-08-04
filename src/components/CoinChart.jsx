import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label
} from "recharts";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CleanData = (data) => {
  let filteredData = [];
  let countDays = 0;
  for (const item of data) {
    let accurateTime = new Date(item.time * 1000).toLocaleTimeString("en-US");
    let accurateDay = new Date();
    accurateDay.setDate(accurateDay.getDate() - countDays);

    filteredData.push({
      'time': accurateDay.toLocaleDateString("en-US") + " " + accurateTime,
      'open price': item.open,
    });
    countDays++;
  }

  return filteredData.reverse();    
};

const CoinChart = ({ symbol, market }) => {
  const [histData, setHistData] = useState(null);

  useEffect(() => {
    const getCoinHist = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&e=${market}&limit=30&api_key=${API_KEY}`
        );
        const json = await response.json();
        setHistData(json.Data.Data);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    getCoinHist();
  }, [market, symbol]);

  return (
    <div>
      {histData ? (
        <div>
          <h2 style={{ color: '#fff' }}>30-Day Price Data for {symbol}</h2>
          <LineChart
            width={1300}
            height={400}
            data={CleanData(histData)}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <Line
              type="monotone"
              dataKey="open price"
              stroke="#00c49f"
              activeDot={{ r: 5 }}
            />
            <CartesianGrid strokeDasharray="5 5" stroke="#555" /> {}
            <XAxis dataKey="time" interval={2} angle={20} dx={20} tick={{ fill: '#ddd' }}>
              <Label value="Date and Time" offset={0} position="insideBottom" fill="#fff" />
            </XAxis>
            <YAxis
              label={{
                value: "Price",
                angle: -90,
                position: "insideLeft",
                textAnchor: "middle",
                fill: "#fff",
              }}
              tick={{ fill: '#ddd' }}
            />
            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} /> {}
          </LineChart>
        </div>
      ) : <p style={{ color: '#fff' }}>Loading...</p>}
    </div>
  );
};

export default CoinChart;
