import React, { useState } from 'react';
import { ChevronRight, Trophy, Swords, Users } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  eventList: string[];
}

export const Header: React.FC<HeaderProps> = ({ eventList }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Smooth scroll function
  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Scrolls to the top of the section
      });
    }
  };

  return (
    <header className="relative h-screen">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&q=80&w=2000"
          className="w-full h-full object-cover"
          alt="Football field"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <nav className="relative z-10 flex justify-between items-center px-6 py-4">
        <div className="flex items-center">
          <img src="../../assets/Kayrakaram_logo_white.png" alt="Custom Logo" className="w-16 h-10" />
          <span className="ml-2 text-2xl font-bold text-white">Karyakaram</span>
        </div>
        <div className="flex gap-6 text-white">
          {/* Add onClick handlers for smooth scrolling */}
          <a 
            href="#tournaments" 
            className="hover:text-orange-500 transition" 
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              handleSmoothScroll('tournaments');
            }}
          >
            Tournaments
          </a>
          <a 
            href="#about" 
            className="hover:text-orange-500 transition" 
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll('about');
            }}
          >
            About
          </a>
          <a 
            href="#contact" 
            className="hover:text-orange-500 transition" 
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll('contact');
            }}
          >
            Contact
          </a>
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Connect, Play &
          <span className="text-orange-500"> Yapp</span>
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl">
        Where Communities Compete, Connect, and Grow Through Events and Challenges, Both On-Field and Online!
        </p>
        <div className="relative">
            <button 
              className="bg-orange-500 text-white px-12 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition flex items-center"
              onClick={() => handleSmoothScroll('upcoming')}
            >
              Join Our Community
              <ChevronRight className="ml-2 w-6 h-6" />
            </button>
            <div className="mt-4 flex justify-center gap-4">
              <Users className="w-12 h-12 text-orange-500 hover:scale-125 transition-transform duration-300" />
              <Trophy className="w-12 h-12 text-orange-500 hover:scale-125 transition-transform duration-300" />
              <Swords className="w-12 h-12 text-orange-500 hover:scale-125 transition-transform duration-300" />
            </div>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-64 bg-black rounded-lg shadow-xl overflow-hidden z-20">
              {eventList.map((event: string, index: number) => (
                <a
                  key={index}
                  href="#tournaments"
                  className="block px-6 py-3 text-white hover:bg-orange-500 transition-colors text-left"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {event}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};