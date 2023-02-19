import React from "react";
import "../styles/globals.css";
import Navbar from "./components/UI/Navbar";


export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        {children}
        </body>
    </html>
  );
}
