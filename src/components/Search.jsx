import React, { useContext, useState, useCallback } from "react";
import searchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "../context/CryptoContext";
import debounce from "lodash.debounce";

const SearchInput = ({ handleSearch, searchData }) => {
  const [searchText, setSearchText] = useState("");
  const {setCoinSearch, setSearchData} = useContext(CryptoContext);

  const handleInput = (e) => {
    const query = e.target.value;
    setSearchText(query);

    if (query.length > 0) {
      handleSearch(query);
    }
  };

  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  }

  return (
    <div className="w-96 relative ml-7 font-nunito">
      <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="search"
          onChange={handleInput}
          value={searchText}
          className="w-full rounded bg-gray-700 placeholder:text-gray-500 pl-2 required outline-0 border border-transparent focus:border-cyan-400"
          placeholder="search here..."
        />
        <button type="submit" className="absolute right-1 cursor-pointer">
          <img src={searchIcon} className="w-full h-auto" alt="search" />
        </button>
      </form>

      {searchText.length > 0 && (
        <ul className="custom-scrollbar absolute top-11 right-0 w-96 max-h-96 rounded overflow-y-auto py-2 bg-transparent bg-opacity-60 backdrop-blur-md z-10 ">
          {searchData && searchData.length > 0 ? (
            searchData.map((coin, index) => (
              <li
                key={coin.id}
                onClick={() => selectCoin(coin.id)}
                className="flex items-center m1-4 my-2 cursor-pointer px-4 py-2 hover:bg-gray-600"
                
              >
                <img
                  src={coin.thumb}
                  alt={coin.name}
                  className="w-[1rem] h-[1rem] mx-1.5"
                />
                <span>{coin.name}</span>
              </li>
            ))
          ) : (
            <div className="w-full h-max-h-96 flex justify-center items-center">

            <div className="w-8 h-8 border-4 border-cyan-400 rounded-full border-b-gray-700 animate-spin" role="status"></div>

            <span className="ml-2 ">Searching...</span>

            </div>
          )}
        </ul>
      )}
    </div>
  );
};

const Search = () => {
  const { getSearchResult, searchData } = useContext(CryptoContext);

  const debounceFunc = useCallback(
    debounce((val) => {
      getSearchResult(val);
    }, 2000),
    []
  );

  return (
    <div className="relative">
      <SearchInput handleSearch={debounceFunc} searchData={searchData} />
    </div>
  );
};

export default Search;
