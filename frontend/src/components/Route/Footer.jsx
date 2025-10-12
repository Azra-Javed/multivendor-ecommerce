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

const Footer = () => {
  return (
    <div className="bg-[#2D6A4F] text-white">
      {/* ===== Email Subscribe Section ===== */}
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#E9F8F0] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal text-[#2D6A4F] font-semibold md:w-2/5">
          <span className="text-[#3BC177]">Subscribe</span> to get the latest{" "}
          <br />
          news, events and offers
        </h1>

        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-3 focus:outline-none border border-[#3BC177] focus:ring-2 focus:ring-[#3BC177] bg-white"
          />
          <button className="bg-[#FFD166] hover:bg-[#EABF4C] text-[#2D6A4F] duration-300 px-5 py-2.5 rounded-md font-semibold md:w-auto w-full transition">
            Submit
          </button>
        </div>
      </div>

      {/* ===== Footer Links Section ===== */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
          {/* Brand & Socials */}
          <ul className="px-5 text-center sm:text-start hidden md:flex flex-col items-center">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="logo"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-gray-200 mt-3 leading-relaxed">
              The home and elements to create beautiful products.
            </p>
            <div className="flex items-center mt-4">
              <AiFillFacebook
                size={25}
                className="ml-3 cursor-pointer text-[#FFD166] hover:text-yellow-300"
              />
              <AiOutlineTwitter
                size={25}
                className="ml-3 cursor-pointer text-[#FFD166] hover:text-yellow-300"
              />
              <AiFillInstagram
                size={25}
                className="ml-3 cursor-pointer text-[#FFD166] hover:text-yellow-300"
              />
              <AiFillYoutube
                size={25}
                className="ml-3 cursor-pointer text-[#FFD166] hover:text-yellow-300"
              />
            </div>
          </ul>

          {/* Company */}
          <ul className="text-center sm:text-start">
            <h1 className="mb-3 font-semibold text-[#FFD166]">Company</h1>
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
          <ul className="text-center sm:text-start">
            <h1 className="mb-3 font-semibold text-[#FFD166]">Shop</h1>
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
          <ul className="text-center sm:text-start">
            <h1 className="mb-3 font-semibold text-[#FFD166]">Support</h1>
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
        <div className="text-center text-gray-300 text-sm border-t border-green-800 pt-6 pb-8">
          <span>© 2025 Azra. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
