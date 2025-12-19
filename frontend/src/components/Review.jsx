import React, { useContext, useState } from "react";
import { ReviewContext } from "../context/ReviewContext";
import { ShopContext } from "../context/ShopContext";
import { Star, ImagePlus, CheckCircle, X, ThumbsUp, Verified, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Reviews = ({ productId }) => {
  const { addReview, getReviews, getAverageRating } =
    useContext(ReviewContext);

  const { token, user } = useContext(ShopContext);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const reviews = getReviews(productId);
  const avg = Number(getAverageRating(productId) || 0);

  /* ================= RATING DISTRIBUTION ================= */
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percentage: reviews.length
      ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100
      : 0,
  }));

  /* ================= FILTERED REVIEWS ================= */
  const filteredReviews = filter === "all" 
    ? reviews 
    : reviews.filter(r => r.rating === parseInt(filter));

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 3);

  /* ================= IMAGE HANDLER ================= */
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }
    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      )
    ).then((base64) => setImages([...images, ...base64]));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  /* ================= SUBMIT REVIEW ================= */
  const submitReview = () => {
    if (!token) {
      alert("Please login to write a review");
      return;
    }

    if (!rating || !comment.trim()) return;

    addReview(productId, {
      rating,
      comment,
      images,
      user: {
        id: user?._id,
        name: user?.name || "User",
      },
      date: new Date().toISOString(),
    });

    setRating(0);
    setComment("");
    setImages([]);
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 2500);
  };

  /* ================= RATING LABELS ================= */
  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <section className="mt-36 max-w-6xl">
      {/* ================= HEADER WITH STATS ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }} />
        </div>

        <div className="relative grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          {/* LEFT - Average Rating */}
          <div className="text-center md:text-left">
            <motion.h2
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-7xl md:text-8xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4"
            >
              {avg.toFixed(1)}
            </motion.h2>
            
            <div className="flex justify-center md:justify-start mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Star
                    size={28}
                    className={`${
                      i <= Math.round(avg)
                        ? "fill-emerald-500 text-emerald-500"
                        : "text-gray-300"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
            
            <p className="text-gray-600 font-medium">
              Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          {/* RIGHT - Rating Distribution */}
          <div className="space-y-3">
            {ratingDistribution.map(({ star, count, percentage }, idx) => (
              <motion.div
                key={star}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="flex items-center gap-4"
              >
                <button
                  onClick={() => setFilter(filter === star.toString() ? "all" : star.toString())}
                  className={`flex items-center gap-2 min-w-[80px] transition ${
                    filter === star.toString() ? 'text-emerald-600 font-semibold' : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  <span className="text-sm font-medium">{star}</span>
                  <Star size={14} className="fill-current" />
                </button>
                
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  />
                </div>
                
                <span className="text-sm text-gray-600 min-w-[40px] text-right">
                  {count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ================= WRITE REVIEW ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl p-8 md:p-10 mb-16 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 relative overflow-hidden"
      >
        {/* Gradient Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <Star className="text-white fill-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Share Your Experience</h3>
            <p className="text-gray-500 text-sm">Help others make informed decisions</p>
          </div>
        </div>

        {/* STARS */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-3">Your Rating *</p>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.2, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRating(i)}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-all"
              >
                <Star
                  size={36}
                  className={`transition-all duration-200 ${
                    i <= (hoverRating || rating)
                      ? "fill-emerald-500 text-emerald-500 drop-shadow-[0_2px_8px_rgba(16,185,129,0.4)]"
                      : "text-gray-300 hover:text-gray-400"
                  }`}
                />
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {(hoverRating || rating) > 0 && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm font-medium text-emerald-600 mt-3"
              >
                {ratingLabels[hoverRating || rating]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* COMMENT */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-3">Your Review *</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you like or dislike? How did the product work for you?"
            className="w-full border-2 border-gray-200 rounded-2xl p-5 min-h-[140px] text-gray-700
                     focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10
                     transition-all resize-none"
          />
          <p className="text-xs text-gray-400 mt-2">{comment.length} / 500 characters</p>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-3">Add Photos (Optional)</p>
          
          <div className="flex flex-wrap gap-4">
            {/* Uploaded Images */}
            <AnimatePresence>
              {images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group"
                >
                  <img
                    src={img}
                    className="w-24 h-24 object-cover rounded-2xl ring-2 ring-gray-200"
                    alt=""
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg"
                  >
                    <X size={14} className="text-white" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Upload Button */}
            {images.length < 5 && (
              <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition group">
                <ImagePlus className="text-gray-400 group-hover:text-emerald-600 transition" size={24} />
                <span className="text-xs text-gray-400 group-hover:text-emerald-600 transition mt-1">Add</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={handleImages}
                />
              </label>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-3">Upload up to 5 photos</p>
        </div>

        {/* SUBMIT */}
        <motion.button
          onClick={submitReview}
          disabled={!rating || !comment.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600
                     hover:from-emerald-700 hover:to-teal-700
                     disabled:from-gray-300 disabled:to-gray-400
                     text-white rounded-full font-semibold text-lg
                     shadow-lg hover:shadow-xl disabled:shadow-none
                     transition-all disabled:cursor-not-allowed"
        >
          Submit Review
        </motion.button>

        {/* ✅ SUCCESS ANIMATION */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm
                         flex flex-col items-center justify-center z-10 rounded-3xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <CheckCircle
                  size={80}
                  className="text-emerald-500 mb-4"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-bold text-gray-900"
              >
                Thank you for your review!
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-500 mt-2"
              >
                Your feedback helps others make better choices
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ================= FILTER TABS ================= */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-full font-medium transition whitespace-nowrap ${
              filter === "all"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter(r => r.rating === star).length;
            if (count === 0) return null;
            return (
              <button
                key={star}
                onClick={() => setFilter(star.toString())}
                className={`px-6 py-3 rounded-full font-medium transition flex items-center gap-2 whitespace-nowrap ${
                  filter === star.toString()
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Star size={16} className="fill-current" />
                {star} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* ================= REVIEWS LIST ================= */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {displayedReviews.map((r, i) => (
            <motion.div
              key={r.date + i}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all"
            >
              {/* HEADER */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {(r.user?.name || "U")[0].toUpperCase()}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">
                        {r.user?.name || "Anonymous"}
                      </p>
                      <Verified size={16} className="text-emerald-600" />
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(r.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Helpful Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition text-sm"
                >
                  <ThumbsUp size={14} />
                  <span>Helpful</span>
                </motion.button>
              </div>

              {/* STARS */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={18}
                    className={`${
                      s <= r.rating
                        ? "fill-emerald-500 text-emerald-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* COMMENT */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {r.comment}
              </p>

              {/* IMAGES */}
              {r.images?.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                  {r.images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setExpandedImage(img)}
                      className="relative group overflow-hidden rounded-2xl"
                    >
                      <img
                        src={img}
                        className="w-32 h-32 object-cover ring-2 ring-gray-200 group-hover:ring-emerald-500 transition"
                        alt=""
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* LOAD MORE */}
        {filteredReviews.length > 3 && !showAllReviews && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowAllReviews(true)}
            className="w-full py-4 border-2 border-gray-200 rounded-2xl font-semibold text-gray-700 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition flex items-center justify-center gap-2"
          >
            Show All Reviews ({filteredReviews.length - 3} more)
            <ChevronDown size={20} />
          </motion.button>
        )}

        {reviews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Star size={40} className="text-gray-300" />
            </div>
            <p className="text-gray-500 text-lg">
              No reviews yet. Be the first to share your experience!
            </p>
          </motion.div>
        )}
      </div>

      {/* ================= IMAGE MODAL ================= */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-gray-100 transition"
            >
              <X size={24} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={expandedImage}
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
              alt=""
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Reviews;