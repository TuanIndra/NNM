import React, { useState, useEffect } from 'react';

const AdminStats = () => {
    const [movieCount, setMovieCount] = useState(null);
    const [userCount, setUserCount] = useState(null);
    const [actorCount, setActorCount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [movieRes, userRes, actorRes] = await Promise.all([
                    fetch('http://localhost:5000/api/movies/count'),
                    fetch('http://localhost:5000/api/users/count'),
                    fetch('http://localhost:5000/api/actors/count')
                ]);

                const movieData = await movieRes.json();
                const userData = await userRes.json();
                const actorData = await actorRes.json();

                setMovieCount(movieData.count);
                setUserCount(userData.count);
                setActorCount(actorData.count);
            } catch (error) {
                console.error('Error fetching counts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCounts();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Thống kê</h2>
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded shadow-md">
                    <h3 className="text-lg font-semibold">Tổng số phim</h3>
                    <p className="text-2xl">{movieCount}</p>
                </div>
                <div className="bg-white p-6 rounded shadow-md">
                    <h3 className="text-lg font-semibold">Tổng số người dùng</h3>
                    <p className="text-2xl">{userCount}</p>
                </div>
                <div className="bg-white p-6 rounded shadow-md">
                    <h3 className="text-lg font-semibold">Tổng số diễn viên</h3>
                    <p className="text-2xl">{actorCount}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;