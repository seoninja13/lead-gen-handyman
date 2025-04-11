/**
 * Review Service
 * 
 * This service provides methods to interact with the reviews table in Supabase.
 */

import { supabase } from '../utils/supabase/client';

/**
 * Get reviews for a business
 * @param {number} businessId - Business ID
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of records to return
 * @param {number} options.offset - Number of records to skip
 * @returns {Promise<Object>} - Reviews data and count
 */
export async function getReviewsByBusiness(businessId, options = {}) {
  try {
    const {
      limit = 10,
      offset = 0,
    } = options;

    const { data, error, count } = await supabase
      .from('reviews')
      .select('*', { count: 'exact' })
      .eq('business_id', businessId)
      .eq('is_published', true)
      .order('review_date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error(`Error fetching reviews for business ${businessId}:`, error);
      throw error;
    }

    return { data, count };
  } catch (error) {
    console.error(`Error in getReviewsByBusiness for business ${businessId}:`, error);
    throw error;
  }
}

/**
 * Get a review by ID
 * @param {number} id - Review ID
 * @returns {Promise<Object>} - Review data
 */
export async function getReviewById(id) {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching review with ID ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error in getReviewById for ID ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new review
 * @param {Object} review - Review data
 * @returns {Promise<Object>} - Created review data
 */
export async function createReview(review) {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();

    if (error) {
      console.error('Error creating review:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createReview:', error);
    throw error;
  }
}

/**
 * Update a review
 * @param {number} id - Review ID
 * @param {Object} updates - Review data to update
 * @returns {Promise<Object>} - Updated review data
 */
export async function updateReview(id, updates) {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating review with ID ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error in updateReview for ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a review
 * @param {number} id - Review ID
 * @returns {Promise<void>}
 */
export async function deleteReview(id) {
  try {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting review with ID ${id}:`, error);
      throw error;
    }
  } catch (error) {
    console.error(`Error in deleteReview for ID ${id}:`, error);
    throw error;
  }
}

/**
 * Get average rating for a business
 * @param {number} businessId - Business ID
 * @returns {Promise<number>} - Average rating
 */
export async function getAverageRating(businessId) {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('business_id', businessId)
      .eq('is_published', true);

    if (error) {
      console.error(`Error fetching ratings for business ${businessId}:`, error);
      throw error;
    }

    if (data.length === 0) {
      return 0;
    }

    const sum = data.reduce((total, review) => total + review.rating, 0);
    return sum / data.length;
  } catch (error) {
    console.error(`Error in getAverageRating for business ${businessId}:`, error);
    throw error;
  }
}

export default {
  getReviewsByBusiness,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getAverageRating,
};
