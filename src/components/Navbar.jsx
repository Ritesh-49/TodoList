import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-violet-800 text-white px-4 py-3 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-2xl tracking-tight">TaskApp</span>
        </div>
        {/* Navigation Links */}
        <ul className="hidden md:flex gap-8 font-medium">
          <li className="cursor-pointer hover:text-violet-300 transition">Home</li>
          <li className="cursor-pointer hover:text-violet-300 transition">Your Tasks</li>
          <li className="cursor-pointer hover:text-violet-300 transition">About</li>
        </ul>
        {/* User Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center font-bold text-lg">
            U
          </div>
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Links (hidden by default, add logic for toggling if needed) */}
      {/* <ul className="md:hidden mt-2 flex flex-col gap-2 font-medium">
        <li className="cursor-pointer hover:text-violet-300 transition">Home</li>
        <li className="cursor-pointer hover:text-violet-300 transition">Your Tasks</li>
        <li className="cursor-pointer hover:text-violet-300 transition">About</li>
      </ul> */}
    </nav>
  )
}

export default Navbar