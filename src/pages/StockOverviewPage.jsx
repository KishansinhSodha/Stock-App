import React from "react";

import StoclList from "../components/StoclList";
import AutoComplete from "../components/AutoComplete";

const StockOverviewPage = () => {
  return (
    <div>
      <AutoComplete />
      <StoclList />
    </div>
  );
};

export default StockOverviewPage;
