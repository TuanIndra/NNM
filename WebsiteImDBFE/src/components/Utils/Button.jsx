import React from "react";
import { Plus } from "lucide-react";

const Button = () => {
    return (
        <button className="flex items-center justify-center gap-2 bg-[#F5C518] hover:bg-yellow-600 transition-all duration-300 text-black font-semibold px-6 py-3 rounded-full w-full  shadow-md">
            <Plus size={20} />
            Add to list
        </button>
    );
};

export default Button;
