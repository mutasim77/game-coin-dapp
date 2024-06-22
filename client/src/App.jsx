import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { contractData } from './utils/contracts';
import Register from './components/Register';
import Login from './components/Login';
import useContract from './hooks/useContract';
import Profile from './components/Profile';
import Home from './components/Home';
import TransferGameCoins from './components/TransferGameCoins';

export default function App() {
  const contracts = useContract(contractData);
  const authContract = contracts.authContract;
  const gameContract = contracts.gameContract;

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register contract={authContract} />} />
        <Route path="/login" element={<Login contract={authContract} />} />
        <Route path="/profile" element={<Profile contracts={contracts} />} />
        <Route path="/transfer" element={<TransferGameCoins contract={gameContract} />} />
      </Routes>
    </Router>
  )
}