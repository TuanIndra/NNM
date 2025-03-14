import { useState, useRef, useEffect } from "react";

const ActorInfo = () => {
    const [expanded, setExpanded] = useState(false);
    const [height, setHeight] = useState("700px"); // Chiều cao ban đầu
    const textRef = useRef(null);

    useEffect(() => {
        if (expanded) {
            setHeight(`700+ 400}px`); // Mở rộng khi bấm "Xem thêm"
        } else {
            setHeight("700px"); // Giữ nguyên khi thu gọn
        }
    }, [expanded]);

    const actor = {
        name: "Tom Cruise",
        birthDate: "1962-07-03",
        birthPlace:
            "In 1976, if you had told fourteen-year-old Franciscan seminary student Thomas Cruise Mapother IV that one day in the not too distant future he would be Tom Cruise, one of the top 100 movie stars of all time, he would have probably grinned and told you that his ambition was to join the priesthood. Nonetheless, this sensitive, deeply religious youngster who was born in 1962 in Syracuse, New York, was destined to become one of the highest paid and most sought after actors in screen history...",
        profileImage:
            "https://images2.thanhnien.vn/528068263637045248/2024/11/28/5-1732774990424925790598.jpg",
        knownForMovies: [
            {
                _id: "1",
                title: "Mission: Impossible – Dead Reckoning Part One",
                releaseYear: 2023,
                trailer: "avz06PDqDbM",
            },
        ],
    };

    return (
        <div className="relative text-white overflow-hidden transition-all duration-500" style={{ height }}>
            {/* 🔹 Background tự động điều chỉnh chiều cao */}
            <div className="absolute inset-0 w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 opacity-60 -z-10"></div>

            {/* 🔹 Nội dung */}
            <div className="relative z-10 p-10">
                <h1 className="text-5xl font-bold ml-24">{actor.name}</h1>

                <div className="flex flex-row items-start space-x-6 mt-4">
                    {/* 🔹 Ảnh diễn viên */}
                    <img
                        src={actor.profileImage}
                        alt={actor.name}
                        className="w-[278px] h-[414px] rounded-2xl mt-4 ml-24"
                    />

                    {/* 🔹 Video */}
                    <div className="w-[737px] h-[414px] aspect-video mt-4 rounded-lg shadow-xl overflow-hidden">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${actor.knownForMovies[0].trailer}?autoplay=1&mute=1`}
                            title="Latest Trailer"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                {/* 🔹 Thông tin diễn viên */}
                <div className="flex flex-row">
                    <div className="max-w-[650px] text-gray-300 ml-24 mt-4">
                        <p
                            ref={textRef}
                            className={`text-lg leading-6 transition-all duration-300 ${
                                expanded ? "line-clamp-none" : "line-clamp-3"
                            }`}
                        >
                            {actor.birthPlace}
                        </p>
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-yellow-500 mt-2"
                        >
                            {expanded ? "Thu gọn" : "Xem thêm"}
                        </button>
                    </div>
                    <p className="text-lg text-gray-300 ml-15 text-left">Born: {actor.birthDate}</p>
                </div>
            </div>
        </div>
    );
};

export default ActorInfo;
