import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Activities', to: '/activities' },
  { label: 'Teams', to: '/teams' },
  { label: 'Users', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container-xl d-flex flex-wrap align-items-center justify-content-between gap-3 py-3">
          <NavLink className="brand" to="/leaderboard" aria-label="Octofit Tracker home">
            <span className="brand-mark" aria-hidden="true">O</span>
            <span>Octofit <span className="brand-light">Tracker</span></span>
          </NavLink>
          <nav className="nav nav-pills" aria-label="Main navigation">
            {navigation.map(({ label, to }) => (
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                key={to}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container-xl app-main py-4 py-lg-5">
        <Routes>
          <Route path="/" element={<Navigate replace to="/leaderboard" />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/leaderboard" />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <div className="container-xl py-3">Octofit Tracker</div>
      </footer>
    </div>
  )
}

export default App