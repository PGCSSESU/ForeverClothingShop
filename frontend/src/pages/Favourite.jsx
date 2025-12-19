import React, { useContext } from "react";
import { FavouriteContext } from "../context/FavaouriteContext";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Favourite = () => {
  const { favourites, toggleFavourite } = useContext(FavouriteContext);

  if (favourites.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500">
        <Heart size={48} className="mb-4" />
        <p>No favourites yet</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold mb-10">Your Favourites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {favourites.map((product) => (
          <div
            key={product._id}
            className="group relative bg-white rounded-2xl shadow hover:shadow-xl transition"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-[280px] object-cover rounded-t-2xl"
              />
            </Link>

            <div className="p-4">
              <h2 className="font-medium">{product.name}</h2>
              <p className="text-emerald-600 font-semibold mt-1">
                ₹{product.price}
              </p>
            </div>

            <button
              onClick={() => toggleFavourite(product)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white shadow"
            >
              <Heart
                size={18}
                className="fill-emerald-500 text-emerald-500"
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Favourite;
