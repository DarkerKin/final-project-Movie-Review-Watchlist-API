import {
  getAllReviewsFromDB,
  getReviewByIdFromDB,
  createReviewInDB,
  updateReviewInDB,
  deleteReviewInDB,
} from '../repositories/reviewRepo.js';

export async function getAllReviews(filter) {
  return await getAllReviewsFromDB(filter);
}

export async function getReviewById(id) {
  return await getReviewByIdFromDB(id);
}

export async function createReview(payload) {
  return await createReviewInDB(payload);
}

export async function updateReview(id, payload) {
  return await updateReviewInDB(id, payload);
}

export async function deleteReview(id) {
  return await deleteReviewInDB(id);
}
