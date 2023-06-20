import React, { useState, useEffect, useContext } from "react";

import finHub from "../apis/finHub";
import { WatcListContext } from "../context/watchListContext";

const AutoComplete = () => {
  let isMounted = true;
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const { addStock } = useContext(WatcListContext);

  const renderDropdown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul
        style={{
          height: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu ${dropDownClass}`}
      >
        {results.map((result) => {
          return (
            <li
              key={result.symbol}
              className="dropdown-item"
              onClick={() => {
                addStock(result.symbol);
                setSearch("");
              }}
            >
              {result.description}({result.symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finHub.get("/search", {
          params: {
            q: search,
          },
        });

        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (err) {}
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }

    return () => (isMounted = false);
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          className="form-control "
          style={{ backgroundColor: "#919eab0a" }}
          id="search"
          type="text"
          placeholder="Search "
          autoComplete="off"
          value={search}
          onChange={(el) => setSearch(el.target.value)}
        />
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  );
};

export default AutoComplete;
