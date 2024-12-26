import React from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.jpg";

interface NavbarProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Navbar({ setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Define the handleNavigation function with appropriate type annotations
  const handleNavigation = (sectionId: string): void => {
    const currentPath = window.location.pathname;
    const scrollToSection = (): void => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (currentPath === "/") {
      // If already on the home page, just scroll to the section
      scrollToSection();
    } else {
      // Navigate to the home page first, then scroll to the section
      window.location.href = `/#${sectionId}`;
      setTimeout(() => {
        scrollToSection();
      }, 500); // Adjust timeout to ensure navigation is complete
    }

    setIsOpen(false); // Close the mobile menu after navigation
  };

  return (
    <nav
      className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 shadow-2xl fixed w-full z-50 border-b-2"
      style={{ borderBottomColor: "rgb(15, 197, 219)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Stochastik Logo"
              className="h-12 w-12 animate-bounce"
            />
            <span
              className="ml-3 text-xl font-extrabold"
              style={{ color: "rgb(15, 197, 219)" }}
            >
              Stochastik Software
            </span>
          </div>

          {/* Links for Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "About", "Services", "Industries", "Internship", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item.toLowerCase())}
                className="text-gray-300 font-medium hover:text-indigo-400 hover:underline underline-offset-4 transition-all duration-300"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 py-4 space-y-2">
            {["Home", "About", "Services", "Industries", "Internship", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item.toLowerCase())}
                className="block px-3 py-2 rounded-lg text-gray-300 font-medium hover:bg-indigo-500 hover:text-white transition-all duration-300"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
