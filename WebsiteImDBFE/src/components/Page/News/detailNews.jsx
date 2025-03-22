const DetailNews = () => {
    return (
        <div className="min-h-screen flex flex-col items-center relative">
            {/* Background chia đôi */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-800 to-pink-600 flex">
                <div className="w-1/2 h-full bg-purple-800"></div>
                <div className="w-1/2 h-full bg-pink-600"></div>
            </div>
            
            {/* Nội dung chính */}
            <div className="relative z-10 w-full max-w-6xl px-6 py-12 text-white">
                {/* Tiêu đề */}
                <h1 className="text-5xl font-bold text-center">IMDb <span className="text-yellow-400">Staff</span> Picks</h1>
                <p className="text-center text-lg mt-2">What to watch in theaters and on streaming</p>
                
                {/* Nội dung tin tức */}
                <div className="mt-12 space-y-12">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img className="w-full md:w-1/2 rounded-lg shadow-lg" src="/path-to-image-1.jpg" alt="Movie 1" />
                        <div className="w-full md:w-1/2 bg-purple-900 p-6 rounded-lg">
                            <h2 className="text-3xl font-bold">O'Dessa</h2>
                            <p className="text-sm text-gray-300">Premieres Thursday, March 28 in Indie</p>
                            <p className="mt-4 text-gray-200">Short description about the movie...</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img className="w-full md:w-1/2 rounded-lg shadow-lg" src="/path-to-image-2.jpg" alt="Movie 2" />
                        <div className="w-full md:w-1/2 bg-purple-900 p-6 rounded-lg">
                            <h2 className="text-3xl font-bold">The Residence</h2>
                            <p className="text-sm text-gray-300">Premieres Thursday, March 28 on Netflix</p>
                            <p className="mt-4 text-gray-200">Short description about the movie...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailNews;
