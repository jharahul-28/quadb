import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './Components/ShowList';
import ShowDetails from './Components/ShowDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/details/:showId" element={<ShowDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
