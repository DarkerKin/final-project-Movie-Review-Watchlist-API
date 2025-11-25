import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from '../services/reviewService.js';

export async function getReviewsHandler(req, res) {
  try {
    // support GET /reviews, GET /reviews?movieId=1, GET /reviews?userId=1, or both
    const movieId = req.query.movieId ? parseInt(req.query.movieId, 10) : undefined;
    const userId = req.query.userId ? parseInt(req.query.userId, 10) : undefined;

    const filter = {};
    if (movieId) filter.movieId = movieId;
    if (userId) filter.userId = userId;

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
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch review' });
  }
}

export async function createReviewHandler(req, res) {
  try {
    const review = await createReview(req.body);
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create review' });
  }
}

export async function updateReviewHandler(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedReview = await updateReview(id, req.body);
    res.status(200).json(updatedReview);
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
