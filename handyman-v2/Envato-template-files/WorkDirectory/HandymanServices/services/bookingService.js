/**
 * Booking Service
 * 
 * This service provides methods to interact with the bookings table in Supabase.
 */

import { supabase } from '../utils/supabase/client';

/**
 * Get bookings for a business
 * @param {number} businessId - Business ID
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of records to return
 * @param {number} options.offset - Number of records to skip
 * @param {string} options.status - Filter by status
 * @returns {Promise<Object>} - Bookings data and count
 */
export async function getBookingsByBusiness(businessId, options = {}) {
  try {
    const {
      limit = 10,
      offset = 0,
      status,
    } = options;

    let query = supabase
      .from('bookings')
      .select('*, services(*)', { count: 'exact' })
      .eq('business_id', businessId);

    if (status) {
      query = query.eq('status', status);
    }

    query = query.order('booking_date', { ascending: true })
      .order('booking_time', { ascending: true })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error(`Error fetching bookings for business ${businessId}:`, error);
      throw error;
    }

    return { data, count };
  } catch (error) {
    console.error(`Error in getBookingsByBusiness for business ${businessId}:`, error);
    throw error;
  }
}

/**
 * Get a booking by ID
 * @param {number} id - Booking ID
 * @returns {Promise<Object>} - Booking data
 */
export async function getBookingById(id) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, businesses(*), services(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching booking with ID ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error in getBookingById for ID ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new booking
 * @param {Object} booking - Booking data
 * @returns {Promise<Object>} - Created booking data
 */
export async function createBooking(booking) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();

    if (error) {
      console.error('Error creating booking:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createBooking:', error);
    throw error;
  }
}

/**
 * Update a booking
 * @param {number} id - Booking ID
 * @param {Object} updates - Booking data to update
 * @returns {Promise<Object>} - Updated booking data
 */
export async function updateBooking(id, updates) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating booking with ID ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error in updateBooking for ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a booking
 * @param {number} id - Booking ID
 * @returns {Promise<void>}
 */
export async function deleteBooking(id) {
  try {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting booking with ID ${id}:`, error);
      throw error;
    }
  } catch (error) {
    console.error(`Error in deleteBooking for ID ${id}:`, error);
    throw error;
  }
}

/**
 * Check availability for a business on a specific date
 * @param {number} businessId - Business ID
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<Array>} - Array of booked time slots
 */
export async function checkAvailability(businessId, date) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('booking_time')
      .eq('business_id', businessId)
      .eq('booking_date', date)
      .in('status', ['pending', 'confirmed']);

    if (error) {
      console.error(`Error checking availability for business ${businessId} on ${date}:`, error);
      throw error;
    }

    // Return array of booked times
    return data.map(booking => booking.booking_time);
  } catch (error) {
    console.error(`Error in checkAvailability for business ${businessId} on ${date}:`, error);
    throw error;
  }
}

export default {
  getBookingsByBusiness,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  checkAvailability,
};
