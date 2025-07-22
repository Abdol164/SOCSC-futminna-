import  { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { ConnectButton } from '@mysten/dapp-kit';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-[#0C0F1F] text-white px-4 sm:px-8 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <img
          src="/img/Suioncampus.png"
          alt="Students at FUT Minna"
          className="font-bold text-lg sm:text-xl hover:text-blue-400 transition-colors duration-200"
        />

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 lg:gap-8">
          <li>
            <Link
              to="/teams"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Teams
            </Link>
          </li>
          <li>
            <Link
              to="/events"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              About US
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/Contact"
            className="hidden md:block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white transition-colors duration-200"
          >
            Join US
          </Link>
          <div className="hidden md:block">
            <ConnectButton />
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-gray-700 rounded transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-64 opacity-100 mt-4'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <ul className="flex flex-col gap-4 pb-4">
          <li>
            <Link
              to="/teams"
              className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200"
              onClick={closeMenu}
            >
              Teams
            </Link>
          </li>
          <li>
            <Link
              to="/Events"
              className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200"
              onClick={closeMenu}
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200"
              onClick={closeMenu}
            >
              About US
            </Link>
          </li>
          <li>
            <Link
              to="/join"
              className="block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white text-center transition-colors duration-200"
              onClick={closeMenu}
            >
              Join US
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
