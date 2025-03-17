import React from "react";
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
    return (
        <div className="min-h-screen">
            <Navbar />

            {/* 🔹 Container tự co giãn, không cố định width */}
            <div className="flex justify-center h-auto">
                <ActorInfo />
            </div>

            <div className="text-white mt-10 flex justify-center ml-24">
                <div className="flex w-full max-w-screen-2xl mx-auto px-4 gap-4 flex-col lg:flex-row">
                    {/* Nội dung chính bên trái */}
                    <div className="flex-1 space-y-6">
                        <PhotoGallery />
                        <KnownFor />
                        <ActorMovies></ActorMovies>
                        <VideoGallery></VideoGallery>
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
            <Footer></Footer>
        </div>
    );
};

export default ActorDetail;
