import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {

  
  const navige = useLocation().pathname;


  return (
    <nav className="w-[40%] mt-16 mb-8 flex justify-around align-middle border border-cyan-300 rounded-lg">
      <Link
        to="/"
        className={`w-full text-base text-center font-nunito m-2.5
            ${
              navige === "/"
                ? "bg-cyan-400 text-gray-700"
                : "bg-gray-800 text-gray-400 hover:text-cyan-300 active:bg-cyan-300 active:text-gray-700 border-0"
            }
            cursor-pointer rounded capitalize font-semibold`}
      >
        Crypto
      </Link>

      <Link
        to="/trending"
        className={`w-full text-base text-center font-nunito m-2.5
            ${
              navige === "/trending"
                ? "bg-cyan-400 text-gray-700"
                : "bg-gray-800 text-gray-400 hover:text-cyan-300 active:bg-cyan-300 active:text-gray-700 border-0"
            }
            cursor-pointer rounded capitalize font-semibold`}
      >
        Trending
      </Link>

      <Link
        to="/saved"
        className={`w-full text-base text-center font-nunito m-2.5 ${
          navige === "/saved"
            ? "bg-cyan-400 text-gray-700"
            : "bg-gray-800 text-gray-400 hover:text-cyan-300 active:bg-cyan-300 active:text-gray-700 border-0"
        }
            cursor-pointer rounded capitalize font-semibold`}
      >
        Saved
      </Link>
    </nav>
  );
};

export default Navigation;
