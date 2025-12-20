import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { SlidersHorizontal } from "lucide-react";

/* ======================================================
   MOTION SYSTEM – CALM & LUXURY
====================================================== */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

/* ======================================================
   COLLECTION PAGE
====================================================== */
const Collection = () => {
  const { products, search, showSearch } =
    useContext(ShopContext);

  /* ---------------- STATE ---------------- */
  const [showFilter, setShowFilter] = useState(true);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [filteredProducts, setFilteredProducts] =
    useState([]);

  /* ---------------- TOGGLES ---------------- */
  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (value) => {
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((s) => s !== value)
        : [...prev, value]
    );
  };

  /* ---------------- FILTER LOGIC ---------------- */
  const computedProducts = useMemo(() => {
    let data = [...products];

    if (showSearch && search) {
      data = data.filter((p) =>
        p.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (category.length) {
      data = data.filter((p) =>
        category.includes(p.category)
      );
    }

    if (subCategory.length) {
      data = data.filter((p) =>
        subCategory.includes(p.subCategory)
      );
    }

    switch (sortType) {
      case "low-high":
        data.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        data.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return data;
  }, [
    products,
    search,
    showSearch,
    category,
    subCategory,
    sortType,
  ]);

  useEffect(() => {
    setFilteredProducts(computedProducts);
  }, [computedProducts]);

  /* ======================================================
     RENDER
  ====================================================== */
  return (
    <section className="relative bg-white">
      {/* AMBIENT BACKGROUND */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-emerald-200/20 blur-[220px]" />
      <div className="absolute bottom-0 -right-40 w-[700px] h-[700px] bg-emerald-300/20 blur-[260px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24">
        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-20 text-center"
        >
          <Title
            text1="ALL"
            text2="COLLECTIONS"
            className="text-4xl md:text-5xl font-extrabold
                       bg-gradient-to-r from-emerald-600 to-emerald-800
                       bg-clip-text text-transparent"
          />
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            Elevated essentials and statement pieces —
            designed to move with you.
          </p>
        </motion.div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-20">
          {/* FILTER SIDEBAR */}
          <aside>
            <div className="lg:hidden mb-6">
              <button
                onClick={() =>
                  setShowFilter(!showFilter)
                }
                className="flex items-center gap-2
                           px-5 py-3 rounded-full
                           border border-gray-300
                           text-sm font-medium"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </div>

            <AnimatePresence>
              {showFilter && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="sticky top-28
                             rounded-[2rem]
                             bg-white/80 backdrop-blur-xl
                             border border-gray-200
                             shadow-[0_25px_70px_rgba(0,0,0,0.08)]
                             p-10 space-y-12"
                >
                  {/* CATEGORY */}
                  <div>
                    <p className="text-sm font-semibold tracking-wide mb-5">
                      CATEGORY
                    </p>
                    <div className="space-y-4 text-gray-600">
                      {["Men", "Women", "Kids"].map(
                        (c) => (
                          <label
                            key={c}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={category.includes(
                                c
                              )}
                              onChange={() =>
                                toggleCategory(c)
                              }
                              className="accent-emerald-600"
                            />
                            {c}
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  {/* TYPE */}
                  <div>
                    <p className="text-sm font-semibold tracking-wide mb-5">
                      TYPE
                    </p>
                    <div className="space-y-4 text-gray-600">
                      {[
                        "Topwear",
                        "Bottomwear",
                        "Winterwear",
                      ].map((s) => (
                        <label
                          key={s}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={subCategory.includes(
                              s
                            )}
                            onChange={() =>
                              toggleSubCategory(s)
                            }
                            className="accent-emerald-600"
                          />
                          {s}
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </aside>

          {/* PRODUCT AREA */}
          <div>
            {/* SORT BAR */}
            <div className="flex justify-between items-center mb-14">
              <p className="text-sm text-gray-500">
                {filteredProducts.length} results
              </p>

              <select
                value={sortType}
                onChange={(e) =>
                  setSortType(e.target.value)
                }
                className="px-5 py-3 rounded-full
                           border border-gray-300
                           text-sm bg-white
                           focus:ring-2 focus:ring-emerald-400"
              >
                <option value="relevant">
                  Sort: Relevant
                </option>
                <option value="low-high">
                  Price: Low → High
                </option>
                <option value="high-low">
                  Price: High → Low
                </option>
              </select>
            </div>

            {/* PRODUCT GRID – FIXED FOR MOBILE */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="
                grid
                grid-cols-3
                sm:grid-cols-2
                md:grid-cols-3
                xl:grid-cols-3
                gap-x-6
                gap-y-16
              "
            >
              {filteredProducts.map((item) => (
                <motion.div
                  key={item._id}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                >
                  <ProductItem
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    className="
                      rounded-[2rem]
                      overflow-hidden
                      bg-white
                      shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                      hover:shadow-[0_30px_90px_rgba(16,185,129,0.25)]
                      transition
                    "
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* EMPTY STATE */}
            {filteredProducts.length === 0 && (
              <div className="py-32 text-center text-gray-500">
                No products match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
