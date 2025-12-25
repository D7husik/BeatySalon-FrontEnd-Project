/**
 * Booking API Service
 * Simulates REST API calls with mock data and delays
 */
import { services, staff } from '../data';

// In-memory storage for appointments (simulates database)
let mockAppointments = [];

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Booking API methods
 */
const api = {
    // ==================== Services ====================

    /**
     * Get all services
     * @returns {Promise<Array>} List of all services
     */
    getServices: async () => {
        await delay(500);
        return [...services];
    },

    /**
     * Get a single service by ID
     * @param {string} id - Service ID
     * @returns {Promise<Object>} Service object
     */
    getService: async (id) => {
        await delay(300);
        const service = services.find(s => s.id === id);
        if (!service) throw new Error('Service not found');
        return service;
    },

    // ==================== Staff ====================

    /**
     * Get all staff members
     * @returns {Promise<Array>} List of all staff
     */
    getStaff: async () => {
        await delay(400);
        return [...staff];
    },

    /**
     * Get a single staff member by ID
     * @param {string} id - Staff ID
     * @returns {Promise<Object>} Staff object
     */
    getStaffMember: async (id) => {
        await delay(300);
        const member = staff.find(s => s.id === id);
        if (!member) throw new Error('Staff member not found');
        return member;
    },

    // ==================== Appointments ====================

    /**
     * Get all appointments
     * @returns {Promise<Array>} List of all appointments
     */
    getAppointments: async () => {
        await delay(400);
        return [...mockAppointments];
    },

    /**
     * Create a new appointment
     * @param {Object} appointment - Appointment data
     * @returns {Promise<Object>} Created appointment with ID
     */
    createAppointment: async (appointment) => {
        await delay(600);
        const newAppointment = {
            ...appointment,
            id: Date.now().toString()
        };
        mockAppointments.push(newAppointment);
        return newAppointment;
    },

    /**
     * Delete an appointment
     * @param {string} id - Appointment ID
     * @returns {Promise<Object>} Deletion confirmation
     */
    deleteAppointment: async (id) => {
        await delay(500);
        const apt = mockAppointments.find(a => a.id === id);
        if (!apt) throw new Error('Appointment not found');
        mockAppointments = mockAppointments.filter(apt => apt.id !== id);
        return { id, deleted: true };
    },

    /**
     * Update an existing appointment
     * @param {string} id - Appointment ID
     * @param {Object} appointment - Updated appointment data
     * @returns {Promise<Object>} Updated appointment
     */
    updateAppointment: async (id, appointment) => {
        await delay(600);
        const index = mockAppointments.findIndex(apt => apt.id === id);
        if (index === -1) throw new Error('Appointment not found');
        mockAppointments[index] = { ...mockAppointments[index], ...appointment };
        return mockAppointments[index];
    }
};

export default api;
