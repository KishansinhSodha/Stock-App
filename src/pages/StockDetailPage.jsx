import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import finHub from "../apis/finHub";
import { StockChart } from "../components/StockChart";
import StockData from "../components/StockData";

const formateData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index]),
    };
  });
};

const StockDetailPage = () => {
  const [chartData, setChartData] = useState();
  const { symbol } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      let oneDay;

      if (date.getDay() === 7) {
        oneDay = currentTime - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 1) {
        oneDay = currentTime - 3 * 24 * 60 * 60;
      } else if (date.getDay() === 2) {
        oneDay = currentTime - 4 * 24 * 60 * 60;
      } else {
        oneDay = currentTime - 24 * 60 * 60;
      }

      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;

      try {
        const responces = await Promise.all([
          finHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30,
            },
          }),
          finHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60,
            },
          }),
          finHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);

        setChartData({
          day: formateData(responces[0].data),
          week: formateData(responces[1].data),
          year: formateData(responces[2].data),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [symbol]);
  return (
    <div>
      {chartData ? (
        <>
          <StockChart chartData={chartData} symbol={symbol} />
          <StockData symbol={symbol} />
        </>
      ) : (
        <h3>Loading</h3>
      )}
    </div>
  );
};

export default StockDetailPage;
