import React, { useContext, useLayoutEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CryptoContext } from "../context/CryptoContext";

const CustomTooltip = ({ payload, label, active, currency }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label text-sm font-bold text-cyan-400">
          {`${label} : ${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            minimumFractionDigits: 5,
          }).format(payload[0].value)}`}
        </p>
      </div>
    );
  }
  return null;
};

const ChartRenderer = ({ data, currency, type }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <Line
        type="monotone"
        dataKey={type}
        stroke="#14ffec"
        strokeWidth={2}
        dot={{ r: 3, stroke: "#14ffec", strokeWidth: 2, fill: "#0e1f2f" }}
        activeDot={{ r: 5 }}
      />
      <XAxis dataKey="date" />
      <YAxis hide domain={["auto", "auto"]} />
      <Tooltip content={<CustomTooltip currency={currency} />} cursor={false} />
      <Legend />
    </LineChart>
  </ResponsiveContainer>
);

const Chart = ({ id }) => {
  const { currency } = useContext(CryptoContext);
  const [chartData, setChartData] = useState(null);
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(7);

  useLayoutEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
          {
            params: {
              vs_currency: currency,
              days,
              precision: "daily",
            },
          }
        );

        const formattedData = res.data[type].map(([timestamp, value]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          [type]: value,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
    };

    fetchChartData();
  }, [id, type, days, currency]);


  return (
    <div className="space-y-4 ">
      {chartData ? (
        <div className="relative backdrop-blur-md bg-opacity-30 bg-black/20 z-0">
          <ChartRenderer data={chartData} currency={currency} type={type} />
        </div>
      ) : (
        <div className="text-center text-sm text-cyan-400 flex items-center justify-center h-[300px]">
          Loading chart...
          <div className="w-8 h-8 border-4 border-cyan-400 rounded-full border-b-gray-700 animate-spin" role="status"></div>
        </div>
      )}

      <div className="btn-chart flex flex-wrap items-center gap-2">
        {["prices", "market_caps", "total_volumes"].map((key) => (
          <button
            key={key}
            className={`px-2 py-1 text-cyan rounded ${
              type === key ? "bg-opacity-25 bg-cyan-400 text-gray-700" : "bg-gray-700"
            }`}
            onClick={() => setType(key)}
          >
            {key.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </button>
        ))}

        {[7, 15, 30].map((day) => (
          <button
            key={day}
            className={`px-2 py-1 text-cyan rounded ${
              days === day ? "bg-opacity-25 bg-cyan-400 text-gray-700" : "bg-gray-700"
            }`}
            onClick={() => setDays(day)}
          >
            {day}d
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chart;
