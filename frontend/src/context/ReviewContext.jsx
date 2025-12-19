import { createContext, useEffect, useState } from "react";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem("reviews");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (productId, review) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: [review, ...(prev[productId] || [])],
    }));
  };

  const getReviews = (productId) => reviews[productId] || [];

  const getAverageRating = (productId) => {
    const list = reviews[productId] || [];
    if (!list.length) return 0;
    const sum = list.reduce((a, r) => a + r.rating, 0);
    return (sum / list.length).toFixed(1);
  };

  return (
    <ReviewContext.Provider
      value={{ addReview, getReviews, getAverageRating }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
