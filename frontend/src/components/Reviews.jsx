import { useState, useEffect } from "react";
import apiRequest from "../../utils/apiRequest";
import { useSelector } from "react-redux"; 

const Reviews = ({ productId, initialReviews=[] }) => {
  const currentUser = useSelector((state) => state.user);
  const [reviews, setReviews] = useState(initialReviews);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(null);
  const [exists,setExists] = useState(false);

  useEffect(() => {
    const existingReview = reviews.find(
    (r) => r.user?._id == currentUser?.id
  );
    if (existingReview) {
      setExists(true);
      setComment(existingReview.comment || "");
      setRating(existingReview.rating || 5);
    } else {
      setComment("");
      setRating(5);
    }
  }, [reviews]);

  // fetch latest reviews
  const fetchReviews = async () => {
    try {
      const res = await apiRequest({
        url: `/api/products/reviews/${productId}`,
        method: "GET",
      });
      setReviews(res.data.reviews || []);
    } catch (err) {
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  // Add or Update Review
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (exists) {
        // update
        await apiRequest({
          url: `/api/products/reviews/${productId}`,
          method: "PATCH",
          data: { rating, comment },
        });
      } else {
        // add new
        await apiRequest({
          url: `/api/products/reviews/${productId}`,
          method: "POST",
          data: { rating, comment },
        });
      }

      // refresh reviews after submit
      fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div >
      {currentUser.role!="admin" && <div className="mt-6 border-t pt-6">
      <h2 className="text-xl font-bold mb-4">Review our product</h2>
      {
        <form
          onSubmit={handleSubmit}
          className="mb-6 flex flex-col gap-3 max-w-md"
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded-lg p-2 w-32"
          >
            <option value="5">⭐ 5</option>
            <option value="4">⭐ 4</option>
            <option value="3">⭐ 3</option>
            <option value="2">⭐ 2</option>
            <option value="1">⭐ 1</option>
          </select>
          <button
            type="submit"
            className={`${
              exists
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded-lg shadow-md transition`}
          >
            {exists ? "Update Review" : "Add Review"}
          </button>
        </form>
    }</div>}

      {error && <p className="text-red-500 font-medium mt-4">⚠️ {error}</p>}

      {reviews.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Customer Reviews
          </h2>
          <div className="space-y-3">
            {reviews.map((review) => {
              return(
              <div
                key={review._id}
                className="bg-gray-50 p-3 rounded-lg border shadow-sm"
              >
                <p className="font-semibold text-gray-700">
                  User : {review.user.name} [{review.user.email}]
                </p>
                <p className="text-gray-600">Comment : {review.comment}</p>
                <p>
                  <span className="text-gray-800 font-medium">Rating:</span>{" "}
                  <span className="text-yellow-500">{review.rating} ⭐</span>
                </p>
              </div>
            )})}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
