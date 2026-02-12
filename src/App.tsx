import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import SecurityLayer from './components/SecurityLayer';

function App() {
  return (
    <>
      <SecurityLayer />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
