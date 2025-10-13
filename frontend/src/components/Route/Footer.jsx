import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import { Link } from "react-router-dom";
import Logo from "/src/assets/logo.png";

const Footer = () => {
  return (
    <div className="bg-[#2D6A4F] text-white">
      {/* ===== Subscribe Section ===== */}
      <div className="md:flex md:justify-between md:items-center sm:px-8 px-4 bg-[#E9F8F0] py-5">
        <h1 className="lg:text-2xl text-xl font-semibold text-[#2D6A4F] mb-4 md:mb-0 md:w-2/5 leading-snug">
          <span className="text-[#3BC177]">Subscribe</span> for the latest news,
          <br className="hidden sm:block" /> events & offers
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800 sm:w-64 w-full py-2 px-3 rounded border border-[#3BC177] focus:outline-none focus:ring-2 focus:ring-[#3BC177] bg-white text-sm"
          />
          <button className="bg-[#FFD166] hover:bg-[#EABF4C] text-[#2D6A4F] font-semibold px-4 py-2 rounded-md text-sm transition">
            Submit
          </button>
        </div>
      </div>

      {/* ===== Footer Links Section ===== */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-4 py-10 sm:text-center">
          {/* Brand & Socials */}
          <ul className="px-4 text-center sm:text-start hidden md:flex flex-col items-center">
            <div>
              <Link className="flex items-center gap-2">
                <img src={Logo} alt="" className="h-[50px] w-full" />
              </Link>
            </div>
            <p className="text-gray-200 mt-2 text-sm leading-snug text-center">
              Home of creative and beautiful products.
            </p>
            <div className="flex items-center mt-3">
              <AiFillFacebook
                size={20}
                className="mx-2 cursor-pointer text-[#FFD166] hover:text-yellow-300"
              />
              <AiOutlineTwitter
                size={20}
                className="mx-2 cursor-pointer text-[#FFD166] hover:text-yellow-300"
              />
              <AiFillInstagram
                size={20}
                className="mx-2 cursor-pointer text-[#FFD166] hover:text-yellow-300"
              />
              <AiFillYoutube
                size={20}
                className="mx-2 cursor-pointer text-[#FFD166] hover:text-yellow-300"
              />
            </div>
          </ul>

          {/* Company */}
          <ul className="text-center sm:text-start text-sm space-y-1">
            <h1 className="mb-2 font-semibold text-[#FFD166] text-base">
              Company
            </h1>
            {footerProductLinks.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.link}
                  className="text-gray-200 hover:text-[#FFD166] duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Shop */}
          <ul className="text-center sm:text-start text-sm space-y-1">
            <h1 className="mb-2 font-semibold text-[#FFD166] text-base">
              Shop
            </h1>
            {footercompanyLinks.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.link}
                  className="text-gray-200 hover:text-[#FFD166] duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Support */}
          <ul className="text-center sm:text-start text-sm space-y-1">
            <h1 className="mb-2 font-semibold text-[#FFD166] text-base">
              Support
            </h1>
            {footerSupportLinks.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.link}
                  className="text-gray-200 hover:text-[#FFD166] duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-300 text-xs border-t border-green-800 pt-4 pb-5">
          <span>© 2025 Azra. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
