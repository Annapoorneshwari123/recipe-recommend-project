import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home';
import Mealdetails from './mealdetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<Mealdetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
