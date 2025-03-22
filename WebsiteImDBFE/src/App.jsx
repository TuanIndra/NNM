import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from "./components/Page/Admin/AdminDashboard";
import ManageMovies from './components/Page/Admin/ManageMovies';
import ManageUsers from './components/Page/Admin/ManageUsers';
import ManageGenres from './components/Page/Admin/ManageGenres';
import ManageReviews from './components/Page/Admin/ManageReviews';
import AdminStats from "./components/Page/Admin/AdminStats";
import NotFound from './components/Page/notfoundPage';
import HomePage from "./components/Page/homePage";
import SignupForm from "./components/Page/Login/registerPage";
import LoginPage from "./components/Page/Login/loginPage";
import WatchlistPage from "./components/Page/Watchlist/watchlistPage";
import CreateWatchlistPage from "./components/Page/Watchlist/createWatchlist";
import WatchlistMoviesPage from "./components/Page/Watchlist/WatchlistMoviesPage";
import RequireLogin from './components/Page/RequireLogin';
import ManageActor from './components/Page/Admin/ManageActor';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrailerPage from './components/Page/TrailerPage';
import ActorDetail from './components/Page/Actor/ActorDetail';
import DetailNews from './components/Page/News/detailNews';
import SearchResultsPage from './components/Page/SearchResultsPage';
import MenuResultsPage from "./components/Page/MenuResultsPage";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); 

  if (!user || user.role !== "admin") {
    return <Navigate to="/not-found" replace />;;
  }

  return children;
};
const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return <Navigate to="/home" replace />;
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
        <Route path="/actor/:id" element={<ActorDetail />} />
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <SignupForm />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/require-login" element={<RequireLogin />} />
        <Route path="/create-watchlist" element={<CreateWatchlistPage />} />
        <Route path="/watchlist/:id" element={<WatchlistMoviesPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/movie/:id" element={<TrailerPage />} />
        <Route path="/menu-results" element={<MenuResultsPage />} />
        <Route path="/detailNews" element={<DetailNews></DetailNews>}></Route>   
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
          <Route path="genres" element={<ManageGenres />} />
          <Route path="reviews" element={<ManageReviews />} />
          <Route path="actors" element={<ManageActor/>} />
          <Route path="stats" element={<AdminStats />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
