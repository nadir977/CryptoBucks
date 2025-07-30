import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import { PiStarThin } from "react-icons/pi";
import CryptoDetails from "../components/CryptoDetails";

 
const Saved = () => {


  const {currency, getCoinDetails ,setShowGraph,showGraph} = useContext(CryptoContext);
   const [coinData,setCoinData] = useState([])
   const clickFunc = (id)=>{
    getCoinDetails(id)
    ;setShowGraph(true)
   }
   const removeCoin = (data)=>{
    const oldcOIN =  JSON.parse(localStorage.getItem('saveCoin')) || []
    const savedCoins = oldcOIN.filter((item)=> item.id !== data?.id)
    localStorage.setItem('saveCoin',JSON.stringify(savedCoins))
    setCoinData(savedCoins)
   }
 const [getSavedCoin, setSavedCoin] = React.useState([]);
   useEffect(()=>{
     const savedCoin = JSON.parse(localStorage.getItem('saveCoin')) || []
     setCoinData(savedCoin)
     setSavedCoin(savedCoin.map((item)=>item.id))
   },[])


  return (
   <>
      <div className="flex w-[80%] flex-col mt-9 border border-gray-700 overflow-x-auto">
        {showGraph&& <CryptoDetails />}
          <table className="w-full table-auto">
            <thead className="capitalize text-base text-gray-400 font-medium border-b border-gray-700">
              <tr>
                <th className="py-1 pl-5 text-start">asset</th>
                <th className="py-1">name</th>
                <th className="py-1">price</th>
                <th className="py-1">total volume</th>
                <th className="py-1">market cap change</th>
                <th className="py-1">1H</th>
                <th className="py-1">24H</th>
                <th className="py-1">7D</th>
              </tr>
            </thead>
            <tbody>
              {coinData?.map((data) => (
                <tr onClick={() =>clickFunc(data?.id)}
                  key={data?.id}
                  className="text-center cursor-pointer text-base border-b border-gray-700 hover:bg-gray-800 last:border-b-0"
                >
                  <td className="py-4 uppercase flex items-center">
                      <button onClick={()=>removeCoin(data)} className="outline-none">
                        <PiStarThin className={`${getSavedCoin.includes(data.id)?"text-cyan-400":""} hover:text-cyan-400 text-[26px] cursor-pointer`} />
                      </button>
                      <img className="w-[1.2rem] h-[1.2rem] mx-1.5"
                        src={data?.image}
                        alt={data.name}/>
                       {data?.symbol}
                  </td>

                  <td className="py-4"> 
                      {data.name} 
                  </td>

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
                        ? "text-green-400 py-4"
                        : "text-red-500 py-4"
                    }
                  >
                    {Number(data?.market_cap_change_percentage_24h).toFixed(2)}%
                  </td>

                  <td
                    className={
                      data?.price_change_percentage_1h_in_currency > 0
                        ? "text-green-400 py-4"
                        : "text-red-500 py-4"
                    }
                  >
                    {Number(data?.price_change_percentage_1h_in_currency).toFixed(2)}%
                  </td>

                  <td
                    className={
                      data?.price_change_percentage_24h > 0
                        ? "text-green-400 py-4"
                        : "text-red-500 py-4"
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
                    {Number(data?.price_change_percentage_7d_in_currency).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
      </div>

    </>
  )
}

export default Saved