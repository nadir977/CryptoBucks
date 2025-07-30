import React, { useContext, useEffect } from "react";
import { CryptoContext } from "../context/CryptoContext";
import Pagination from "./Pagination";
import { PiStarThin } from "react-icons/pi";
 
const TableComponent = () => {
  const { cryptoData, currency, getCoinDetails, setShowGraph } = useContext(CryptoContext);

 const [getSavedCoin, setSavedCoin] = React.useState([]);
  const saveCoin = (data)=>{
    const oldCoins = JSON.parse(localStorage.getItem("saveCoin")) || [];
    let arrCoin = [] 
    if(oldCoins.length===0){ 
      arrCoin.push(data)  
    }else{ 
      const findcoin = oldCoins.filter((item)=>item.id===data.id)
      if(findcoin.length===0){
        arrCoin = [...oldCoins,data]
      }else{
        arrCoin = oldCoins.filter((item)=>item.id!==data.id)

      }
    } 
     setSavedCoin(arrCoin.map((item)=>item.id))
    localStorage.setItem("saveCoin",JSON.stringify(arrCoin))
  }
  
  useEffect(()=>{
   const data =  JSON.parse(localStorage.getItem("saveCoin")).map((item)=>item.id) || []
   setSavedCoin(data)
  },[])
 


  return (  
    <>
      <div className="flex flex-col mt-9 border border-gray-700">
        {cryptoData ? (
          <table className="w-full table-auto">
            <thead className="capitalize text-base text-gray-400 font-medium border-b border-gray-700">
              <tr>
                <th className="py-1">asset</th>
                <th className="py-1">name</th>
                <th className="py-1">price</th>
                <th className="py-1">total volume</th>
                <th className="py-1">market cap change</th>
                <th className="py-1 lg:table-cell hidden">1H</th>
                <th className="py-1 lg:table-cell hidden">24H</th>
                <th className="py-1 lg:table-cell hidden">7D</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData?.map((data) => (
                <tr
                  key={data?.id}
                  className="text-center cursor-pointer text-base border-b border-gray-700 hover:bg-gray-800 last:border-b-0"
                >
                  <td className="py-4 uppercase flex items-center">
                    <button
                      onClick={() => saveCoin(data)}
                      className="outline-none"
                    >
                      <PiStarThin className={`${getSavedCoin.includes(data.id)?"text-cyan-400":""} hover:text-cyan-400 text-[26px] cursor-pointer`} />
                    </button>
                    <div
                      className="flex items-center"
                      onClick={() => {
                        getCoinDetails(data?.id);
                        setShowGraph(true);
                      }}
                    >
                      <img
                        className="w-[1.2rem] h-[1.2rem] mx-1.5"
                        src={data?.image}
                        alt={data.name}
                      />
                      {data?.symbol}
                    </div>
                  </td>

                  <td className="py-4">{data.name}</td>

                  <td className="py-4">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                    }).format(data?.current_price)}
                  </td>

                  <td className="py-4">{data?.total_volume}</td>

                  <td
                    className={
                      data?.market_cap_change_percentage_24h > 0
                        ? "text-green-400 lg:table-cell hidden py-4"
                        : "text-red-500 lg:table-cell hidden py-4"
                    }
                  >
                    {Number(data?.market_cap_change_percentage_24h).toFixed(2)}%
                  </td>

                  <td
                    className={
                      data?.price_change_percentage_1h_in_currency > 0
                        ? "text-green-400 lg:table-cell hidden py-4"
                        : "text-red-500 lg:table-cell hidden py-4"
                    }
                  >
                    {Number(
                      data?.price_change_percentage_1h_in_currency
                    ).toFixed(2)}
                    %
                  </td>

                  <td
                    className={
                      data?.price_change_percentage_24h > 0
                        ? "text-green-400 lg:table-cell hidden py-4"
                        : "text-red-500 lg:table-cell hidden py-4"
                    }
                  >
                    {Number(data?.price_change_percentage_24h).toFixed(2)}%
                  </td>

                  <td
                    className={
                      data?.price_change_percentage_7d_in_currency > 0
                        ? "text-green-400 py-4"
                        : "text-red-500 py-4"
                    }
                  >
                    {Number(
                      data?.price_change_percentage_7d_in_currency
                    ).toFixed(2)}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>

      <div className="flex items-center justify-between mt-4 capitalize h-[2rem]">
        <span>
          Data provided by{" "}
          <a
            className="text-cyan-400"
            href="http://www.coingecko.com"
            rel="noreferrer"
            target="_blank"
          >
            Coingecko
          </a>
        </span>
        <Pagination />
      </div>
    </>
  );
};

export default TableComponent;
