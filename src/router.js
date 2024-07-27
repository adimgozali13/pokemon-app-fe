import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokeDex from './pages/pokedex';
import DetailPage from './pages/detail';
import Header from './partials/header';
import MyPokemon from './pages/my-pokemon';

const MainRoutes = () => {
  return (
    <Router>
        <Header/>
      <Routes>
        <Route path="/" element={<PokeDex />} />
        <Route path="/my-pokemon" element={<MyPokemon />} />
        <Route path="/detail/:pokemon" element={<DetailPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default MainRoutes;