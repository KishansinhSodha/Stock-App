import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import StockOverviewPage from "./pages/StockOverviewPage";
import StockDetailPage from "./pages/StockDetailPage";
import { WatcListContextProvider } from "./context/watchListContext";

function App() {
  return (
    <div className="container">
      <WatcListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/detail/:symbol" element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </WatcListContextProvider>
    </div>
  );
}

export default App;
