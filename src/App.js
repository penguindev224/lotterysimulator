import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import DailyLotteryRoll from './components/DailyLotteryRoll';
import BuckLotteryRoll from './components/BuckLotteryRoll';
import './App.css';  // Import the CSS

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="side-menu">
          <ul>
            <li>
              <NavLink to="/daily-lottery" activeClassName="active-link">
                Daily Lottery Roll
              </NavLink>
            </li>
            <li>
              <NavLink to="/buck-lottery" activeClassName="active-link">
                Buck Lottery Roll
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<DailyLotteryRoll />} />
            <Route path="/daily-lottery" element={<DailyLotteryRoll />} />
            <Route path="/buck-lottery" element={<BuckLotteryRoll />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;