import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import Board from './pages/Board';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/board" element={<Board />} />
        <Route path="/task/:id" element={<Board />} />
        <Route path="/" element={<Navigate to="/login" replace />} /> {/* fallback route */}
      </Routes>
    </Router>
  );
}

export default App;
