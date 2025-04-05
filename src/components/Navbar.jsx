import React, { useState } from 'react';
import { Menu, ChevronRight, Search, Globe, X } from 'lucide-react';
import chevlogo from '../assets/chevlogo.png';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate(); // Initialize navigate

    const handleSignOut = () => {
        // Perform any sign-out logic here (clear session, etc.)
        navigate('/signin'); // Navigate to the Sign In page
    };

    return (
        <header className="fixed w-full top-0 left-0 right-0 z-50">
            <div className="bg-[#F5F5F5] text-sm py-2">
                <div className="max-w-7xl mx-auto px-4 flex justify-end items-center space-x-6">
                    <a target="_blank" href="https://www.chevron.com/worldwide">
                        <button className="flex items-center text-gray-600 hover:text-blue-800">
                            <Globe className="h-4 w-4 mr-1" />
                            Global Sites
                        </button>
                    </a>
                    <button className="flex items-center text-gray-600 hover:text-blue-800">
                        <Search className="h-4 w-4 mr-1" />
                        Search
                    </button>
                </div>
            </div>
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/signin" className="flex items-center">
                                <ChevronRight className="h-8 w-8 text-[#00395D]" />
                                <img src={chevlogo} alt="Chevron Logo" className="h-10 w-12 ml-2" />
                                <span className="text-xl font-bold text-[#00395D] ml-1">CHEVRON</span>
                            </Link>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/hero" className="text-gray-700 hover:text-[#00395D]">Home</Link>
                            <Link to="/chevyou" className="text-gray-700 hover:text-[#00395D]">ChevYou</Link>
                            <a target="_blank" href="https://www.chevron.com/who-we-are" className="text-gray-700 hover:text-[#00395D]">About</a>
                            <a target="https://www.chevron.com/worldwide/united-states" href="https://www.chevron.com/worldwide/united-states" className="text-gray-700 hover:text-[#00395D]">Operations</a>
                            <a target="_blank"href="https://www.chevron.com/sustainability" className="text-gray-700 hover:text-[#00395D]">Sustainability</a>
                            <a target="_blank" href="https://www.chevron.com/investors" className="text-gray-700 hover:text-[#00395D]">Investors</a>
                            <a target="_blank" href="https://www.chevron.com/who-we-are/contact/jobs" className="font-semibold text-[#00395D]">Careers</a>
                            <Link to="/signin" className="text-gray-700 hover:text-[#00395D]">Sign Out</Link>
                        </div>

                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-600"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="px-4 py-3 space-y-3 space-x-3">
                        <Link to="/hero" className="text-gray-700 hover:text-[#00395D]">Home</Link>
                        <Link to="/chevyou" className="text-gray-700 hover:text-[#00395D]">ChevYou</Link>
                        <a target="_blank" href="https://www.chevron.com/who-we-are" className="text-gray-700 hover:text-[#00395D]">About</a>
                            <a target="https://www.chevron.com/worldwide/united-states" href="https://www.chevron.com/worldwide/united-states" className="text-gray-700 hover:text-[#00395D]">Operations</a>
                            <a target="_blank"href="https://www.chevron.com/sustainability" className="text-gray-700 hover:text-[#00395D]">Sustainability</a>
                            <a target="_blank" href="https://www.chevron.com/investors" className="text-gray-700 hover:text-[#00395D]">Investors</a>
                            <a target="_blank" href="https://www.chevron.com/who-we-are/contact/jobs" className="font-semibold text-[#00395D]">Careers</a>
                            <button onClick={handleSignOut} className="text-gray-700 hover:text-[#00395D]">Sign Out</button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Navbar;
