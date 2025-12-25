import React, { useState, useEffect, useRef } from 'react';
import { Check, Scissors, User, Calendar, Clock } from 'lucide-react';
import { useBooking } from '../hooks';
import { formatDate } from '../utils';
import { LoadingSpinner, ErrorMessage } from '../components';
import WeatherTips from '../components/booking/WeatherTips';

/**
 * Confirmation Page Component
 * Displays booking confirmation after successful appointment creation
 * @param {Object} props
 * @param {Object} props.bookingData - Booking details from previous step
 * @param {Function} props.onNavigate - Navigation handler
 */
const ConfirmationPage = ({ bookingData, onNavigate }) => {
    const { createAppointment, loading } = useBooking();
    const [confirmed, setConfirmed] = useState(false);
    const [error, setError] = useState(null);

    // Use ref to prevent double execution in React StrictMode
    const hasCreatedAppointment = useRef(false);

    // Create appointment on mount (only once)
    useEffect(() => {
        if (bookingData && !hasCreatedAppointment.current) {
            hasCreatedAppointment.current = true;
            handleConfirmation();
        }
    }, []);

    const handleConfirmation = async () => {
        try {
            const appointmentData = {
                serviceIds: bookingData.services.map(s => s.id),
                serviceNames: bookingData.services.map(s => s.name).join(', '),
                staffId: bookingData.staff.id,
                staffName: bookingData.staff.name,
                date: bookingData.date,
                time: bookingData.time,
                clientName: bookingData.clientName,
                phone: bookingData.phone,
                email: bookingData.email || '',
                notes: bookingData.notes || '',
                totalPrice: bookingData.totalPrice,
                totalDuration: bookingData.totalDuration,
                status: 'confirmed',
                createdAt: new Date().toISOString()
            };

            await createAppointment(appointmentData);
            setConfirmed(true);
        } catch (err) {
            setError(err.message);
            // Reset ref on error so user can retry
            hasCreatedAppointment.current = false;
        }
    };

    if (loading) return <LoadingSpinner />;

    if (error) {
        return (
            <div className="confirmation-page confirmation-page--error">
                <ErrorMessage message={error} onRetry={handleConfirmation} />
                <button
                    onClick={() => onNavigate('home')}
                    className="btn btn--primary btn--full"
                >
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="confirmation-page">
            <div className="confirmation-card">
                {/* Success Icon */}
                <div className="confirmation-card__icon">
                    <Check className="icon-lg" />
                </div>

                {/* Title */}
                <h1 className="confirmation-card__title">Booking Confirmed!</h1>
                <p className="confirmation-card__subtitle">
                    Your appointment has been successfully scheduled.
                </p>

                {/* Appointment Details */}
                <div className="confirmation-details">
                    <h2 className="confirmation-details__title">Appointment Details</h2>

                    <div className="confirmation-details__list">
                        <div className="confirmation-details__item">
                            <Scissors className="icon" />
                            <div className="confirmation-details__content">
                                <p className="confirmation-details__label">Services</p>
                                <p className="confirmation-details__value">
                                    {bookingData.services.map(s => s.name).join(', ')}
                                </p>
                                <p className="confirmation-details__meta">
                                    ${bookingData.totalPrice} • {bookingData.totalDuration} minutes
                                </p>
                            </div>
                        </div>

                        <div className="confirmation-details__item">
                            <User className="icon" />
                            <div className="confirmation-details__content">
                                <p className="confirmation-details__label">Specialist</p>
                                <p className="confirmation-details__value">{bookingData.staff.name}</p>
                            </div>
                        </div>

                        <div className="confirmation-details__item">
                            <Calendar className="icon" />
                            <div className="confirmation-details__content">
                                <p className="confirmation-details__label">Date</p>
                                <p className="confirmation-details__value">{formatDate(bookingData.date)}</p>
                            </div>
                        </div>

                        <div className="confirmation-details__item">
                            <Clock className="icon" />
                            <div className="confirmation-details__content">
                                <p className="confirmation-details__label">Time</p>
                                <p className="confirmation-details__value">{bookingData.time}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Weather Tips */}
                <WeatherTips
                    bookedServices={bookingData.services.map(s => s.name)}
                    appointmentTime={bookingData.time}
                />

                {/* Action Buttons */}
                <div className="confirmation-actions">
                    <button
                        onClick={() => onNavigate('appointments')}
                        className="btn btn--primary btn--full"
                    >
                        View My Appointments
                    </button>

                    <button
                        onClick={() => onNavigate('home')}
                        className="btn btn--secondary btn--full"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
