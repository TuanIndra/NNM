import React from 'react';
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
import WatchlistMoviesPage from "./components/Watchlist/WatchlistMoviesPage";
import RequireLogin from './components/Page/RequireLogin';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrailerPage from './components/Page/TrailerPage';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); 

  if (!user || user.role !== "admin") {
    return <Navigate to="/not-found" replace />;;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <ToastContainer 
        position="top-center" 
        autoClose={1000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
      />
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<SignupForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/require-login" element={<RequireLogin />} />
        <Route path="/create-watchlist" element={<CreateWatchlistPage />} />
        <Route path="/watchlist/:id" element={<WatchlistMoviesPage />} />
        <Route path="/movie/:id" element={<TrailerPage />} />

        <Route
          path="admin/*"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        >
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

export default App;
