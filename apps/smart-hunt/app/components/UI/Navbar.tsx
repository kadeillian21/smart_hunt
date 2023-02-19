'use client'

import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div>
      <nav className="bg-gray-500 h-14">
        <div className="max-w-7xl mx-1 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                d
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/"
                    className={`hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium `}
                  >
                    Smart Hunt
                  </Link>

                  <Link
                    href="/antelope"
                    className={`hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium`}
                  >
                    Antelope
                  </Link>

                  <Link
                    href="/elk"
                    className={`hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium`}
                  >
                    Elk
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
