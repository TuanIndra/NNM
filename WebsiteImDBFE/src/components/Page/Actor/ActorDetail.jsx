import React from "react";
import Navbar from "../../Navbar/Navbar";
import ActorInfo from "./ActorInfo";
import ActorMovies from "./ActorMovies";
import MoreTrailers from "./MoreTrailers";

const ActorDetail = () => {
    return (
        <div className=" min-h-screen">
            <Navbar />
            <div className=" text-white mt-10">
                <ActorInfo />
                <ActorMovies />
                <MoreTrailers />
            </div>
        </div>
    );
};

export default ActorDetail;
