import React from 'react'
import HomePage from './components/Page/homePage'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from "./components/Page/Admin/AdminDashboard";
import ManageMovies from './components/Page/Admin/ManageMovies';
import ManageUsers from './components/Page/Admin/ManageUsers';
import ManageReviews from './components/Page/Admin/ManageReviews';
import AdminStats from "./components/Page/Admin/AdminStats";
import NotFound from './components/Page/notfoundPage';
const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />

          <Route path="admin" element={<AdminDashboard />}>
            <Route path="movies" element={<ManageMovies />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="reviews" element={<ManageReviews />} />
            <Route path="stats" element={<AdminStats />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App
