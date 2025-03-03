import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login/>}/>
            </Routes>
      </div>
    );
};

export default AppRouter;
