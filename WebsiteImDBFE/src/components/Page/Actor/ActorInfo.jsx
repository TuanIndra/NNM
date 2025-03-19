import { useState } from "react";
import MediaButtons from "./MediaButtons";
import Button from "../../Utils/Button";

const ActorInfo = ({ actor }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="flex relative text-white overflow-hidden transition-all duration-500 justify-center min-h-[700px] h-auto">
            <div className="absolute inset-0 w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 opacity-60 -z-10"></div>

            <div className="relative z-10 p-10 mt-10 ml-5 mr-5">
                <h1 className="text-5xl font-bold ml-25">{actor.name}</h1>

                <div className="flex flex-row space-x-6 mt-4">
                    <img
                        src={actor.profileImage}
                        alt={actor.name}
                        className="w-[278px] h-[414px] rounded-2xl mt-4 ml-24"
                    />

                    <div className="w-[737px] h-[414px] aspect-video mt-4 rounded-lg shadow-xl overflow-hidden ml-0.5">
                        {actor.knownForMovies?.[0]?.trailer ? (
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${actor.knownForMovies[0].trailer}?autoplay=1&mute=1`}
                                title="Latest Trailer"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="w-full h-full bg-gray-500 flex items-center justify-center">
                                No trailer available
                            </div>
                        )}
                    </div>

                    <MediaButtons photosCount={actor.photos?.length || 0} />
                </div>

                <div className="flex flex-row">
                    <div className="max-w-[813px] text-white ml-24 mt-4">
                        <p
                            className={`text-lg leading-6 transition-all duration-500 ${expanded ? "max-h-[500px]" : "max-h-[72px] overflow-hidden"}`}
                        >
                            {actor.birthPlace || "No biography available"}
                        </p>
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-yellow-500 mt-2"
                        >
                            {expanded ? "Thu gọn" : "Xem thêm"}
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-start text-white ml-15 justify-between mt-5">
                            Born: {actor.birthDate ? new Date(actor.birthDate).toLocaleDateString() : "Unknown"}
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