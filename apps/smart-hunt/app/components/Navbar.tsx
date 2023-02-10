'use client'

import React from "react";

// The Navbar component is a simple TSX component that causes a navbar to render at the top of each page.  The Navbar houses links to the home page, to the display page (reviews), and to the modify page (contribute).


function Navbar() {
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-1 px-4 sm:px-6 lg:px-8 trial">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                mango
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar
