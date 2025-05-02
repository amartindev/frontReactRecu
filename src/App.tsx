import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Statistics from './pages/Statistics';
import Navbar from './components/Navbar';
import { IntlProvider } from 'react-intl';
import './App.css';

const messages = {
  EUR: {
    currency: '€',
  },
};



function App() {
  return (

    <IntlProvider locale="es" messages={messages["EUR"]}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ventas" element={<Sales />} />
          <Route path="/estadisticas" element={<Statistics />} />
        </Routes>
      </Router>
    </IntlProvider>
  );
}

export default App;
