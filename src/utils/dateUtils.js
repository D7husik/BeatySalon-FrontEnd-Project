/**
 * Date and time utility functions
 */

/**
 * Generate available time slots for booking
 * Returns slots from 9:00 AM to 5:30 PM in 30-minute intervals
 * @returns {string[]} Array of time slots in HH:MM format
 */
export const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
        for (let minute of [0, 30]) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            slots.push(time);
        }
    }
    return slots;
};

/**
 * Check if a time slot is available for booking
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} time - Time in HH:MM format
 * @param {string} staffId - Staff member ID
 * @param {Array} appointments - List of existing appointments
 * @returns {boolean} True if slot is available
 */
export const isSlotAvailable = (date, time, staffId, appointments) => {
    return !appointments.some(apt =>
        apt.date === date &&
        apt.time === time &&
        apt.staffId === staffId
    );
};

/**
 * Format a date string for display
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date (e.g., "Friday, December 13, 2024")
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} Today's date
 */
export const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
};
