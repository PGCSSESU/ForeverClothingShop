import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  
  return (
    <Link
      to={`/product/${id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="block w-full group"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-black shadow-lg">
        <img
          src={image?.[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Subtle dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* TEXT AREA (LOCKED HEIGHT) */}
      <div className="mt-3 text-center px-1">
        {/* Product Name */}
        <p className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[3rem] transition-colors duration-300 group-hover:text-gray-600">
          {name}
        </p>

        {/* Price */}
        <p className="mt-1 text-base font-semibold text-gray-900 min-h-[1.5rem] transition-colors duration-300 group-hover:text-black">
          {currency}{price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
