import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Page/homePage";
import SignupForm from "./components/Login/registerPage";
import LoginPage from "./components/Login/loginPage";
import WatchlistPage from "./components/Watchlist/watchlistPage";
import CreateWatchlistPage from "./components/Watchlist/createWatchlist";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignupForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/create-watchlist" element={<CreateWatchlistPage />} />
      </Routes>
    </Router>
  );
};

export default App;
