const MoreToExplore = () => {
    const staffPicks = {
        title: "Staff Picks: What to Watch in March",
        link: "#",
        images: [
            { id: 1, src: "https://th.bing.com/th?id=OIP.GkZYZu_UVTY-W1rv5R_74wHaOG&w=181&h=345&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2", title: "The Wheel of Time" },
            { id: 2, src: "https://th.bing.com/th?id=OIP.GkZYZu_UVTY-W1rv5R_74wHaOG&w=181&h=345&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2", title: "The Electric State" },
            { id: 3, src: "https://th.bing.com/th?id=OIP.GkZYZu_UVTY-W1rv5R_74wHaOG&w=181&h=345&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2", title: "Adolescence" },
        ],
    };

    const editorialLists = [
        {
            id: 1,
            title: "The Billion-Dollar Film Club: 50+ Movies To Reach $1 Billion Worldwide",
            updated: "3 weeks ago",
            imagesCount: 57,
            thumbnail: "https://th.bing.com/th?id=OIP.GkZYZu_UVTY-W1rv5R_74wHaOG&w=181&h=345&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
        },
        {
            id: 2,
            title: "The top 10 worldwide box office hits of 2023",
            updated: "1 year ago",
            imagesCount: 10,
            thumbnail: "https://th.bing.com/th?id=OIP.GkZYZu_UVTY-W1rv5R_74wHaOG&w=181&h=345&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
        },
        {
            id: 3,
            title: "The top 10 worldwide box office hits of 2022",
            updated: "1 year ago",
            imagesCount: 10,
            thumbnail: "https://th.bing.com/th?id=OIP.GkZYZu_UVTY-W1rv5R_74wHaOG&w=181&h=345&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
        },
    ];

    return (
        <div className="text-black mr-24">
            <h2 className="text-xl font-bold border-l-4 border-yellow-500 pl-2 mb-4">More to explore</h2>

            {/* 🔹 Staff Picks */}
            <div className="mb-6">
                <div className="flex space-x-2 overflow-hidden rounded-lg">
                    {staffPicks.images.map((item) => (
                        <img
                            key={item.id}
                            src={item.src}
                            alt={item.title}
                            className="w-[80px] h-[120px] object-cover rounded-lg"
                        />
                    ))}
                </div>
                <p className="mt-2 text-gray-300 text-sm">{staffPicks.title}</p>
                <a href={staffPicks.link} className="text-blue-500 hover:underline text-sm">
                    See our picks
                </a>
            </div>

            {/* 🔹 Editorial Lists */}
            <h3 className="text-lg font-bold">Editorial lists</h3>
            <p className="text-gray-400 text-sm mb-4">Related lists created by IMDb editors</p>

            <div className="space-y-4">
                {editorialLists.map((list) => (
                    <div key={list.id} className="flex items-center space-x-3 p-2 bg-gray-800 rounded-lg shadow">
                        <img src={list.thumbnail} alt={list.title} className="w-[50px] h-[50px] rounded-lg" />
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold">{list.title}</h4>
                            <p className="text-gray-500 text-xs">
                                updated {list.updated} • {list.imagesCount} images
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoreToExplore;
