import { useMovies } from "../hooks/useMovies";

export default function MovieReviews() {
  const { reviews } = useMovies();

  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <h3>Author: {review.author}</h3>
            <p>{review.content}</p>
            <p>
              Created at: {new Date(review.created_at).toLocaleDateString()}
            </p>
            <hr />
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}
