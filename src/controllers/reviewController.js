import { getAllReviews, getReviewById, createReview, updateReview, deleteReview,} from '../services/reviewService.js';

export async function getReviewsHandler(req, res) {
  try {
    // support GET /reviews and GET /reviews?movieId=1
    const movieId = req.query.movieId ? parseInt(req.query.movieId, 10) : undefined;
    const filter = {};
    if (movieId) filter.movieId = movieId;
    const reviews = await getAllReviews(filter);
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
}

export async function getReviewByIdHandler(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const review = await getReviewById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch review' });
  }
}

export async function createReviewHandler(req, res) {
  try {
    // Expect body: { userId, movieId, rating, comment }
    const { userId, movieId, rating, comment } = req.body;
    if (!userId || !movieId || typeof rating !== 'number') {
      return res.status(400).json({ message: 'userId, movieId and numeric rating are required' });
    }
    const created = await createReview({ userId, movieId, rating, comment });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create review' });
  }
}

export async function updateReviewHandler(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { rating, comment } = req.body;
    if (typeof rating !== 'number' && comment === undefined) {
      return res.status(400).json({ message: 'Provide rating (number) or comment to update' });
    }
    const updated = await updateReview(id, { rating, comment });
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(500).json({ message: 'Failed to update review' });
  }
}

export async function deleteReviewHandler(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteReview(id);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(500).json({ message: 'Failed to delete review' });
  }
}