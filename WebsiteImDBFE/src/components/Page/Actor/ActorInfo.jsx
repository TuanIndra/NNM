import { useState } from "react";
import MediaButtons from "./MediaButtons";
import Button from "../../Utils/Button";

const ActorInfo = ({ actor }) => {
    const [expanded, setExpanded] = useState(false);

    // Hàm trích xuất YouTube ID từ URL hoặc ID
    const getYouTubeId = (trailer) => {
        if (!trailer) return null;
        if (!trailer.includes("watch?v=") && !trailer.includes("youtu.be")) return trailer;
        const match = trailer.match(/(?:v=|youtu\.be\/)([^&?]+)/);
        return match ? match[1] : null;
    };

    // Chọn ngẫu nhiên một trailer từ knownForMovies
    const getRandomTrailer = () => {
        const moviesWithTrailers = actor?.knownForMovies?.filter(movie => movie.trailer) || [];
        if (moviesWithTrailers.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * moviesWithTrailers.length);
        return getYouTubeId(moviesWithTrailers[randomIndex].trailer);
    };

    // Lấy trailer ngẫu nhiên
    const trailerId = getRandomTrailer();
    const embedUrl = trailerId ? `https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1` : null;

    // Hàm cắt ngắn description
    const truncateText = (text, maxLength) => {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    // Giá trị hiển thị cho description
    const descriptionText = actor?.description || "No description available";
    const shortDescription = truncateText(descriptionText, 100); // Cắt ngắn thành 100 ký tự

    return (
        <div className="flex relative text-white overflow-hidden transition-all duration-500 justify-center min-h-[700px] h-auto">
            {/* Gradient background */}
            <div className="absolute inset-0 w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 opacity-60 -z-10"></div>

            <div className="relative z-10 p-10 mt-10 ml-5 mr-5">
                {/* Tên diễn viên */}
                <h1 className="text-5xl font-bold ml-25">{actor?.name || "Unknown Actor"}</h1>

                <div className="flex flex-row space-x-6 mt-4">
                    {/* Ảnh đại diện của diễn viên */}
                    <img
                        src={actor?.profileImage || "https://placehold.co/278x414"}
                        alt={actor?.name || "Actor"}
                        className="w-[278px] h-[414px] rounded-2xl mt-4 ml-24"
                        onError={(e) => (e.target.src = "https://placehold.co/278x414")}
                    />

                    {/* Trailer video */}
                    <div className="w-[737px] h-[414px] aspect-video mt-4 rounded-lg shadow-xl overflow-hidden ml-0.5">
                        {embedUrl ? (
                            <iframe
                                className="w-full h-full"
                                src={embedUrl}
                                title="Random Movie Trailer"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.nextSibling.style.display = "flex";
                                }}
                            ></iframe>
                        ) : null}
                        <div
                            className="w-full h-full bg-gray-500 flex items-center justify-center"
                            style={{ display: embedUrl ? "none" : "flex" }}
                        >
                            <p className="text-white">No trailer available or video unavailable</p>
                        </div>
                    </div>

                    {/* Media buttons */}
                    <MediaButtons photosCount={actor?.photos?.length || 0} />
                </div>

                <div className="flex flex-row">
                    {/* Biography */}
                    <div className="max-w-[813px] text-white ml-24 mt-4">
                        <p
                            className={`text-lg leading-6 transition-all duration-500 ${expanded ? "max-h-[500px]" : "max-h-[72px] overflow-hidden"}`}
                        >
                            {expanded ? descriptionText : shortDescription}
                        </p>
                        {descriptionText.length > 100 && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="text-yellow-500 mt-2"
                            >
                                {expanded ? "Thu gọn" : "Xem thêm"}
                            </button>
                        )}
                    </div>

                    {/* Thông tin bổ sung */}
                    <div className="flex flex-col">
                        <p className="text-start text-white ml-15 justify-between mt-5">
                            Born: {actor?.birthDate ? new Date(actor.birthDate).toLocaleDateString() : "Unknown"}
                        </p>
                        <div className="ml-24 w-[358px] h-[48px] justify-start mt-4">
                            <Button />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActorInfo;