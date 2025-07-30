import React, { useContext, useRef } from "react";
import paginationArrow from "../assets/pagination-arrow.svg";
import { CryptoContext } from "../context/CryptoContext";
import submitIcon from "../assets/submit-icon.svg";

const PerPage = () => {
  const { setPerPage, setPage } = useContext(CryptoContext);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = Number(inputRef.current.value);
    if (val > 0 && val <= 250) {
      setPerPage(val);
      setPage(1);
    }
  };

  return (
    <form className="relative flex items-center font-nunito mr-12" onSubmit={handleSubmit}>
      <label
        htmlFor="perpage"
        className="relative flex justify-center items-center mr-2 font-bold"
      >
        per page:
      </label>
      <input
        id="perpage"
        type="number"
        name="perpage"
        min={1}
        max={250}
        ref={inputRef}
        placeholder="10"
        className="w-16 rounded bg-gray-700 placeholder:text-gray-500 pl-2 required outline-0 border border-transparent focus:border-cyan-400 leading-4"
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img src={submitIcon} alt="submit" className="w-full h-auto" />
      </button>
    </form>
  );
};

const Pagination = () => {
  const { page, setPage, totalPages, cryptoData } = useContext(CryptoContext);
  const TotalNumber = totalPages;

  const next = () => {
    if (page < TotalNumber) {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    const nextPage = page + 3;
    if (nextPage >= TotalNumber) {
      setPage(TotalNumber);
    } else {
      setPage(nextPage);
    }
  };

  const multiStepPrev = () => {
    const prevPage = page - 3;
    if (prevPage <= 1) {
      setPage(1);
    } else {
      setPage(prevPage);
    }
  };
 
 
 return (
    <div className="flex items-center">
      <PerPage />
      <ul className="flex items-center justify-end text-sm">
        <li>
          <button className="outline-0 cursor-pointer hover:text-cyan-400 w-8" onClick={prev}>
            <img className="w-full h-auto rotate-180" src={paginationArrow} alt="left" />
          </button>
        </li>

        {page > 4 && (
          <li>
            <button
              onClick={multiStepPrev}
              className="outline-0 cursor-pointer hover:text-cyan-400 rounded-full w-8 h-8 flex items-center justify-center text-lg"
            >
              ...
            </button>
          </li>
        )}

        {page > 1 && (
          <li>
            <button
              onClick={() => setPage(page - 1)}
              className="outline-0 cursor-pointer hover:text-cyan-400 rounded-full w-8 h-8 flex items-center justify-center bg-gray-700 mx-1.5"
            >
              {page - 1}
            </button>
          </li>
        )}

        <li>
          <button
            disabled
            className="outline-0 cursor-pointer text-gray-700 rounded-full w-8 h-8 flex items-center justify-center bg-cyan-400 mx-1.5"
          >
            {page}
          </button>
        </li>

        {page < TotalNumber && (
          <li>
            <button
              onClick={() => setPage(page + 1)}
              className="outline-0 cursor-pointer hover:text-cyan-400 rounded-full w-8 h-8 flex items-center justify-center bg-gray-700 mx-1.5"
            >
              {page + 1}
            </button>
          </li>
        )}

        {page < TotalNumber - 3 && (
          <li>
            <button
              onClick={multiStepNext}
              className="outline-0 cursor-pointer hover:text-cyan-400 rounded-full w-8 h-8 flex items-center justify-center text-lg"
            >
              ...
            </button>
          </li>
        )}

        {page < TotalNumber - 1 && (
          <li>
            <button
              onClick={() => setPage(TotalNumber)}
              className="outline-0 cursor-pointer hover:text-cyan-400 rounded-full w-8 h-8 flex items-center justify-center bg-gray-700 mx-1.5"
            >
              {TotalNumber}
            </button>
          </li>
        )}

        <li>
          <button className="outline-0 cursor-pointer hover:text-cyan-400 w-8" onClick={next}>
            <img className="w-full h-auto" src={paginationArrow} alt="right" />
          </button>
        </li>
      </ul>
    </div>
  );
  
 
};

export default Pagination;
