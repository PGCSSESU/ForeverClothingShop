import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={`/product/${id}`}
      className="block w-full group"
    >
      {/* Mystic Shadow Effect */}
      <div className="relative overflow-hidden rounded-lg bg-black shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-black">
        
        {/* Dark Magical Aura */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.7),transparent)] opacity-40 transition-opacity duration-500 group-hover:opacity-70"></div> */}

        {/* Product Image */}
        <img
          src={image[0]}
          alt={name}
          className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="mt-3 text-center">
        <p className="text-md font-medium text-drank orange-300 transition-colors duration-300 group-hover:text-gray-400">
          {name}
        </p>
        <p className="text-lg font-semibold text-drankorangetransition-colors duration-300 group-hover:text-white">
          {currency}{price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
