import React, { createContext, useEffect, useLayoutEffect, useState } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setcryptoData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [coinSearch, setCoinSearch] = useState("");
  const [coinDetails, setCoinDetails] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [trendData, setTrendData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showGraph, setShowGraph] = useState(false);


  
  const getcryptoData = async () => {
   
     
      
    try {
      if (!coinSearch) {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/list`);
        const allCoins = await res.json();

        setTotalPages(Math.ceil(allCoins.length / perPage));
      } else {
        setTotalPages(1);
      }
      
      let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=${perPage}&order=${sortBy}&page=${page}&price_change_percentage=1h%2C24h%2C7d`;

      if (coinSearch) {
        url += `&ids=${coinSearch}`;
      }

        const response = await fetch(url);
        const data = await response.json(); 
        setcryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoinDetails = async (coinid) => {
    try {
      setIsLoading(true)
      
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinid}`);
      const data = await response.json();
      setCoinDetails(data);
      
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  };

  const getSearchResult = async (query) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      const data = await response.json();
      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFunction = () => {
    setPage(1);
    setCoinSearch("");
  };




const getTrendData = async () => {
  try {
    const url = `https://api.coingecko.com/api/v3/search/trending`;
    const response = await fetch(url);
    const data = await response.json();

    console.log("Trending Data:", data);
    setTrendData(data.coins);
  } catch (error) {
    console.error("Error fetching trending data:", error);
  }
};



  useLayoutEffect(() => {
    getcryptoData();
  }, [coinSearch, currency, sortBy, page, perPage, trendData]);


  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        setcryptoData,
        searchData,
        setSearchData,
        getSearchResult,
        coinSearch,
        setCoinSearch,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        resetFunction,
        setPerPage,
        perPage,
        coinDetails,  
        setCoinDetails,
        getCoinDetails,
        trendData, 
        setTrendData,
        isLoading,
        showGraph, setShowGraph,
        getTrendData
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
