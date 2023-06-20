import React, { useEffect, useState } from "react";

import finHub from "../apis/finHub";

const StockData = ({ symbol }) => {
  const [stockData, setStockData] = useState();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finHub.get("/stock/profile2", {
          params: {
            symbol,
          },
        });
        console.log(response);
        if (isMounted) {
          setStockData(response.data);
        }
      } catch (error) {}
    };
    fetchData();
    return () => (isMounted = false);
  }, [symbol]);
  return (
    <div>
      {stockData && (
        <>
          <div className="row border bg-white rounded shadow-sm p-4 mt-5">
            <img
              src={stockData.logo}
              alt="logo"
              className=" logo-img me-3 rounded-circle img-fluid shadow"
            />
            <div className="col">
              <div>
                <span className="fw-bold">name: </span>
                {stockData.name}
              </div>
              <div>
                <span className="fw-bold">country: </span>
                {stockData.country}
              </div>
              <div>
                <span className="fw-bold">ticker: </span>
                {stockData.ticker}
              </div>
            </div>
            <div className="col">
              <div>
                <span className="fw-bold">Exchange: </span>
                {stockData.exchange}
              </div>
              <div>
                <span className="fw-bold">Industry: </span>
                {stockData.finnhubIndustry}
              </div>
              <div>
                <span className="fw-bold">IPO: </span>
                {stockData.ipo}
              </div>
            </div>
            <div className="col">
              <div>
                <span className="fw-bold">Market Cap: </span>
                {stockData.marketCapitalization}
              </div>
              <div>
                <span className="fw-bold">Shares Outstanding: </span>
                {stockData.shareOutstanding}
              </div>
              <div>
                <span className="fw-bold">url: </span>
                <a href={stockData.weburl}>{stockData.weburl}</a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StockData;
