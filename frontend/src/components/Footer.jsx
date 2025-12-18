import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-white mt-32 overflow-hidden">

      {/* Soft Ambient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-[140px]" />
      </div>

      {/* Top Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-14 md:grid-cols-[2fr_1fr_1fr]">

        {/* BRAND */}
        <div>
          <img src={assets.logo} alt="Forever" className="w-36 mb-6" />

          <p className="text-gray-600 leading-relaxed max-w-md">
            Forever is a modern fashion destination built for confidence,
            individuality, and everyday elegance. Crafted with premium fabrics
            and timeless design principles.
          </p>

          <p className="mt-5 text-sm text-gray-500 italic">
            Designed to be worn. Built to be remembered.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest text-gray-900 uppercase mb-6">
            Navigation
          </h4>

          <ul className="space-y-4 text-sm">
            {[
              { name: "Home", to: "/" },
              { name: "About", to: "/about" },
              { name: "Collection", to: "/collection" },
              { name: "Privacy Policy", to: "/privacy" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  to={item.to}
                  className="group inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition"
                >
                  <span className="h-[6px] w-[6px] rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT + CARD */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest text-gray-900 uppercase mb-6">
            Contact
          </h4>

          <div className="space-y-3 text-sm text-gray-600">
            <p>+91 63852 58142</p>
            <p>sesuuraj@gmail.com</p>
          </div>

          {/* Glass Card */}
          <div
            className="mt-8 p-6 rounded-2xl 
                       bg-white/70 backdrop-blur-xl
                       border border-gray-200
                       shadow-[0_18px_40px_rgba(16,185,129,0.25)]"
          >
            <p className="text-sm font-semibold text-gray-900">
              7-Day Easy Returns
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Simple, transparent, hassle-free.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200">
        <p className="py-6 text-center text-xs text-gray-500">
          © 2025 <span className="text-emerald-600 font-medium">Forever</span>.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
