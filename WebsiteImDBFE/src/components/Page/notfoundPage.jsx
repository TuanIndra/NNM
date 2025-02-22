import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-4">Oops! Trang bạn tìm kiếm không tồn tại.</p>
            <Link 
                to="/" 
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700"
            >
                Quay về trang chủ
            </Link>
        </div>
    );
};

export default NotFound;
