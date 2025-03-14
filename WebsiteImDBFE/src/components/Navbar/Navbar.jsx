import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { CiMenuBurger } from "react-icons/ci";
import SearchBar from "./searchBar";
import MenuComponent from "../Utils/MenuComponent";// Import menu

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State menu

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Chặn scroll
    } else {
      document.body.style.overflow = "auto"; // Bỏ chặn scroll
    }
    // Cleanup khi component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-[#121212] text-white z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/home" className="flex-shrink-0">
                <img className="h-8 w-auto" src={logo} alt="IMDb" />
              </a>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* Nút Menu */}
                  <button
                    onClick={() => setIsMenuOpen(true)}
                    className="flex px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                  >
                    <CiMenuBurger className="text-white mr-2 h-4.5 w-4.5" /> Menu
                  </button>

                  {/* Dropdown Categories */}
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
                    >
                      Categories
                      <svg
                        className="ml-2 -mr-0.5 h-4 w-4 inline-block"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Phim
                          </a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Show truyền hình
                          </a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Giải thưởng và sự kiện
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* SearchBar */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center md:ml-6">
                <SearchBar />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Mở menu chính</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hiển thị Menu khi isMenuOpen = true */}
      {isMenuOpen && <MenuComponent onClose={() => setIsMenuOpen(false)} />}
    </>
  );
};

export default Navbar;
