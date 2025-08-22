import React, { useContext } from 'react';
import TableComponent from '../components/TableComponent';
import Filters from '../components/Filters'; 
import CryptoDetails from '../components/CryptoDetails';
import { CryptoContext } from '../context/CryptoContext';  

const Home = () => {
  const { showGraph} = useContext(CryptoContext); 

  return (
    <section className="w-full max-w-7xl  mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col mb-24 relative">
      <Filters />
      <TableComponent /> 
      {showGraph&& <CryptoDetails />}
    </section>
  );
};

export default Home;
