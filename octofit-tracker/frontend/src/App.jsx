import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { API_BASE_URL } from './api.js';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">
          <img src="/octofitapp-small.png" alt="OctoFit Tracker" />
          <span>OctoFit <em>Tracker</em></span>
        </NavLink>
        <span className="api-indicator"><i /> API online · 8000</span>
      </header>
      <nav className="app-nav" aria-label="Primary navigation">
        <NavLink to="/" end>Overview</NavLink>
        <NavLink to="/activities">Activity</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/users">Athletes</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
      </nav>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Overview />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <span>OctoFit Tracker</span>
        <span className="api-url">{API_BASE_URL}</span>
      </footer>
    </div>
  );
}

function Overview() {
  return (
    <section className="overview" aria-labelledby="overview-title">
      <div className="overview-copy">
        <p className="eyebrow">Your movement, in one place</p>
        <h1 id="overview-title">Small steps.<br /><span>Strong momentum.</span></h1>
        <p className="intro">Track the work, find your people, and keep the next good choice close.</p>
        <NavLink className="primary-action" to="/activities">View activity <span aria-hidden="true">↗</span></NavLink>
      </div>
      <div className="overview-mark" aria-hidden="true"><span>O</span><strong>FIT</strong></div>
      <div className="overview-links">
        <NavLink to="/leaderboard"><span>01</span>See the leaderboard <b>↗</b></NavLink>
        <NavLink to="/workouts"><span>02</span>Choose a workout <b>↗</b></NavLink>
      </div>
    </section>
  );
}

export default App;
