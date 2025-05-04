import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="py-16 text-gray-300">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
        
        {/* Logo & Description */}
        <div>
          <img 
            src={assets.logo} 
            className="mb-5 w-32 brightness-200 contrast-125" 
            alt="Forever Logo" 
          />
      <p className="w-full md:w-2/3 text-[#064635] leading-relaxed">
  Step into the world of <span className="text-[green] font-semibold">Forever eCommerce</span>, where fashion blends <strong className="text-[green]">creativity</strong> with <strong className="text-[#green]">confidence</strong>. Our collection is designed for those who dare to stand out, offering a mix of <strong className="text-[green]">bold trends</strong> and <strong className="text-[green]">classic elegance</strong>. Whether you're looking for <strong className="text-[green]">casual comfort</strong> or <strong className="text-[green]">statement pieces</strong>, we have something for every style. Crafted with <strong className="text-[green]">premium fabrics</strong> and <strong className="text-[green]">expert precision</strong>, our outfits redefine everyday fashion. Because style isn’t just about<strong className="text-[orange]"><br></br>"what you wear—it’s about how you</strong>  <strong className="text-[black]">own it".</strong> ✨
</p>


        </div>

        {/* Company Links */}
        <div>
          <p className="text-2xl font-semibold mb-5 text-green-500 tracking-wide uppercase">
            ✦ Company ✦
          </p>
          <ul className="flex flex-col gap-3 text-gray-400">
            {["🏠 Home", "📖 About Us", "🚚 Delivery", "🔒 Privacy Policy"].map((item, index) => (
              <li key={index} className="group transition-all duration-300 cursor-pointer flex items-center gap-2">
                <span className="group-hover:text-green-400">{item}</span>
                <div className="w-0 group-hover:w-full h-[2px] bg-green-400 transition-all duration-300"></div>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <p className="text-2xl font-semibold mb-5 text-green-500 tracking-wide uppercase">
             Get in Touch 
          </p>
          <ul className="flex flex-col gap-3 text-gray-400">
            {[
              { icon: "📞", text: "7639644749" },
              { icon: "📧", text: "rebelprem858@gmail.com" }
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2 cursor-pointer group transition-all duration-300">
                {item.icon} <span className="group-hover:text-green-400">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative mt-10">
        <hr className="border-gray-600" />
        <p className="py-5 text-sm text-center text-gray-500">
          ⚡ Copyright © 2025 <span className="text-green-400">Forever.com</span> - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
