import React from 'react';
import { Calendar } from 'lucide-react';
import { useBooking } from '../hooks';
import { LoadingSpinner, ErrorMessage, AppointmentCard } from '../components';

/**
 * My Appointments Page Component
 * Displays user's upcoming appointments with management options
 * @param {Object} props
 * @param {Function} props.onNavigate - Navigation handler
 */
const MyAppointmentsPage = ({ onNavigate }) => {
    const {
        appointments,
        services,
        staff,
        deleteAppointment,
        loading,
        error,
        refreshAppointments
    } = useBooking();

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={refreshAppointments} />;

    // Filter and sort upcoming appointments
    const upcomingAppointments = appointments
        .filter(apt => {
            const aptDate = new Date(apt.date + 'T' + apt.time);
            return aptDate >= new Date();
        })
        .sort((a, b) => {
            const dateA = new Date(a.date + 'T' + a.time);
            const dateB = new Date(b.date + 'T' + b.time);
            return dateA - dateB;
        });

    return (
        <div className="appointments-page">
            {/* Header */}
            <div className="appointments-page__header">
                <h1 className="appointments-page__title">My Appointments</h1>
                <p className="appointments-page__subtitle">
                    Manage your upcoming salon appointments
                </p>
            </div>

            {/* Appointments List */}
            {upcomingAppointments.length === 0 ? (
                <div className="empty-appointments">
                    <Calendar className="empty-appointments__icon" />
                    <h3 className="empty-appointments__title">No Upcoming Appointments</h3>
                    <p className="empty-appointments__text">
                        Ready to look your best? Book your next appointment now!
                    </p>
                    <button
                        onClick={() => onNavigate('home')}
                        className="btn btn--primary"
                    >
                        Book Appointment
                    </button>
                </div>
            ) : (
                <div className="appointments-grid">
                    {upcomingAppointments.map(apt => (
                        <AppointmentCard
                            key={apt.id}
                            appointment={apt}
                            services={services}
                            staff={staff}
                            onCancel={deleteAppointment}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAppointmentsPage;
