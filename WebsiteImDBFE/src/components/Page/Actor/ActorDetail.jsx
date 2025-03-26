import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get actor ID from URL
import Navbar from "../../Navbar/Navbar";
import ActorInfo from "./ActorInfo";
import MoreTrailers from "./MoreTrailers";
import MoreToExplore from "./MoreToExplore";
import PhotoGallery from "./PhotoGallery";
import KnownFor from "./KnownFor";
import FeaturedVideos from "../../Utils/FeaturedVideo";
import Footer from "../Footer";
import ActorMovies from "./ActorMovie";
import VideoGallery from "./VideoGallery";

const ActorDetail = () => {
    const { id } = useParams(); // Get actor ID from URL params (e.g., /actors/:id)
    const [actor, setActor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActor = async () => {
            try {
                console.log("Fetching actor with ID:", id);
                const response = await fetch(`http://localhost:5000/api/actors/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Actor data:", data);
                setActor(data);
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err.message);
                setError(err.message);
                setLoading(false);
            }
        };
    
        fetchActor();
    }, [id]);

    // Render loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Error: {error}
            </div>
        );
    }
    return (
        <div className="min-h-screen">
            <Navbar />

            {/* 🔹 Container tự co giãn, không cố định width */}
            <div className="flex justify-center h-auto">
                <ActorInfo actor={actor} />
            </div>

            <div className="text-white mt-10 flex justify-center ml-24">
                <div className="flex w-full max-w-screen-2xl mx-auto px-4 gap-4 flex-col lg:flex-row">
                    {/* Nội dung chính bên trái */}
                    <div className="flex-1 space-y-6">
                        <PhotoGallery photos={actor.photos} />
                        <KnownFor movies={actor.knownForMovies} />
                        <ActorMovies movies={actor.knownForMovies} />
                        <VideoGallery /> {/* Add logic if videos are part of schema */}
                        <div className="lg:w-[856px] w-full bg-white mb-10">
                            <FeaturedVideos />
                        </div>
                    </div>

                    {/* MoreToExplore cố định bên phải nhưng vẫn co giãn */}
                    <div className="lg:w-[412px] w-full bg">
                        <MoreToExplore />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ActorDetail;