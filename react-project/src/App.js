import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from './Header.js';
import Enquiry from './Enquiry.js';
import Menu from './Menu.js';
import Product from './Product.js';

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Menu />} />
      <Route exact path="/header" element={<Header />} />
      <Route exact path="/enquiry" element={<Enquiry />} />
      <Route exact path="/product" element={<Product />} />
    </Routes>
  );
};

export default App;
