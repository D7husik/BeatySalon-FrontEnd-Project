import React, { useState } from 'react';
import { Calendar, Clock, User, Phone } from 'lucide-react';
import { formatDate } from '../../utils';

/**
 * Appointment Card Component
 * Displays an appointment with its details and cancel option
 * @param {Object} props
 * @param {Object} props.appointment - Appointment object
 * @param {Array} props.services - Available services list
 * @param {Array} props.staff - Available staff list
 * @param {Function} props.onCancel - Cancel handler
 */
const AppointmentCard = ({ appointment, services, staff, onCancel }) => {
    const [cancelling, setCancelling] = useState(false);

    // Get service details
    const appointmentServices = appointment.serviceIds?.map(id =>
        services.find(s => s.id === id)
    ).filter(Boolean) || [];

    // Get staff details
    const staffMember = staff.find(s => s.id === appointment.staffId);

    const handleCancel = async () => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            setCancelling(true);
            try {
                await onCancel(appointment.id);
            } catch (err) {
                alert('Failed to cancel appointment');
            } finally {
                setCancelling(false);
            }
        }
    };

    return (
        <div className="appointment-card">
            <div className="appointment-card__header">
                <div className="appointment-card__info">
                    <h3 className="appointment-card__title">
                        {appointmentServices.map(s => s?.name).join(', ')}
                    </h3>
                    <p className="appointment-card__staff">{staffMember?.name}</p>
                </div>
                <span className="appointment-card__status">Confirmed</span>
            </div>

            <div className="appointment-card__details">
                <div className="appointment-card__detail">
                    <Calendar className="icon-sm" />
                    <span>{formatDate(appointment.date)}</span>
                </div>
                <div className="appointment-card__detail">
                    <Clock className="icon-sm" />
                    <span>{appointment.time}</span>
                </div>
                <div className="appointment-card__detail">
                    <User className="icon-sm" />
                    <span>{appointment.clientName}</span>
                </div>
                <div className="appointment-card__detail">
                    <Phone className="icon-sm" />
                    <span>{appointment.phone}</span>
                </div>
            </div>

            <button
                onClick={handleCancel}
                disabled={cancelling}
                className="appointment-card__cancel-btn"
            >
                {cancelling ? 'Cancelling...' : 'Cancel Appointment'}
            </button>
        </div>
    );
};

export default AppointmentCard;
