const AdminStats = () => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Thống kê</h2>
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded shadow-md">
                    <h3 className="text-lg font-semibold">Tổng số phim</h3>
                    <p className="text-2xl">100</p>
                </div>
                <div className="bg-white p-6 rounded shadow-md">
                    <h3 className="text-lg font-semibold">Tổng số người dùng</h3>
                    <p className="text-2xl">500</p>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
