import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from "./components/Page/Admin/AdminDashboard";
import ManageMovies from './components/Page/Admin/ManageMovies';
import ManageUsers from './components/Page/Admin/ManageUsers';
import ManageReviews from './components/Page/Admin/ManageReviews';
import AdminStats from "./components/Page/Admin/AdminStats";
import NotFound from './components/Page/notfoundPage';
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
        <Route path="admin" element={<AdminDashboard />}>
            <Route path="movies" element={<ManageMovies />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="reviews" element={<ManageReviews />} />
            <Route path="stats" element={<AdminStats />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
};
export default App
