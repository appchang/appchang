import React, { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-600">AppChang Pro</span>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
            Features
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
            Solutions
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
            Pricing
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
            Resources
          </a>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <button className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700">
            Log in
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
            Sign up
          </button>
        </div>
        {/* Mobile menu button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-white px-4 py-2 shadow-md">
          <nav className="flex flex-col space-y-3 pb-3">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium py-2">
              Features
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium py-2">
              Solutions
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium py-2">
              Pricing
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium py-2">
              Resources
            </a>
            <div className="pt-2 flex flex-col space-y-3">
              <button className="px-4 py-2 text-blue-600 font-medium border border-blue-600 rounded-md">
                Log in
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium">
                Sign up
              </button>
            </div>
          </nav>
        </div>}
    </header>;
}