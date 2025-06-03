import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
  FaFacebookMessenger,
} from "react-icons/fa";
import { FiHeadphones } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-8 mt-12 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-primary">FarmSense</h1>
          <div className="flex space-x-4 text-xl mt-2 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook
                aria-label="Facebook"
                className="hover:text-primary transition cursor-pointer"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                aria-label="Instagram"
                className="hover:text-primary transition cursor-pointer"
              />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok
                aria-label="TikTok"
                className="hover:text-primary transition cursor-pointer"
              />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube
                aria-label="YouTube"
                className="hover:text-primary transition cursor-pointer"
              />
            </a>
            <a
              href="https://wa.me/94707824814"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp
                aria-label="WhatsApp"
                className="hover:text-primary transition cursor-pointer"
              />
            </a>
            <a
              href="https://messenger.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookMessenger
                aria-label="Messenger"
                className="hover:text-primary transition cursor-pointer"
              />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-4 text-gray-600 dark:text-gray-400 text-xs mb-4">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-primary transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-primary transition">
            Contact
          </Link>
          <Link to="/services" className="hover:text-primary transition">
            Services
          </Link>
        </div>

        {/* Address and Contact Section */}
        <div className="flex flex-col md:flex-row gap-4 border-t border-gray-200 dark:border-gray-700 pt-4 justify-between">
          <div>
            <p className="text-gray-700 dark:text-gray-300 text-xs">
              Galle Road,
              <br />
              Colombo 03,
              <br />
              Sri Lanka
            </p>
          </div>
          <div>
            <h2 className="text-gray-900 dark:text-white flex items-center mb-2 text-sm">
              <FiHeadphones className="mr-2" aria-label="Headphones Icon" />{" "}
              Hotline
            </h2>
            <p className="font-bold text-gray-700 dark:text-gray-300 text-xs">
              +94 112 824 814
              <br />
              +94 707 824 814
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              (8.30 am to 8.30 pm GMT+5.30)
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-4 flex flex-col md:flex-row text-gray-600 dark:text-gray-400 text-xs">
          <p className="mx-auto">© 2025 FarmSense. Powered by Your Team.</p>
        </div>
      </div>
    </footer>
  );
}
