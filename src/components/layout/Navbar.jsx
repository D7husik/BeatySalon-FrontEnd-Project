import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks';

/**
 * Navbar Component
 * Main navigation bar with Suulu Salon logo, theme toggle, and accessible navigation
 * @param {Object} props
 * @param {string} props.currentPage - Current active page
 * @param {Function} props.onNavigate - Navigation handler
 */
const Navbar = ({ currentPage, onNavigate }) => {
    const { isDarkMode, toggleTheme } = useTheme();

    // Handle keyboard navigation
    const handleKeyDown = (e, page) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onNavigate(page);
        }
    };

    return (
        <nav className="navbar" role="navigation" aria-label="Main navigation">
            <div className="navbar__container">
                <div className="navbar__content">
                    {/* Logo */}
                    <div
                        className="navbar__logo"
                        onClick={() => onNavigate('home')}
                        onKeyDown={(e) => handleKeyDown(e, 'home')}
                        role="button"
                        tabIndex={0}
                        aria-label="Go to home page"
                    >
                        <img
                            src="/images/logo.png"
                            alt="Suulu Salon"
                            className="navbar__logo-img"
                        />
                    </div>

                    {/* Navigation Links */}
                    <div className="navbar__links" role="menubar">
                        <button
                            onClick={() => {
                                onNavigate('home');
                                // Scroll to services section after navigation
                                setTimeout(() => {
                                    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                            className={`navbar__link ${currentPage === 'home' ? 'navbar__link--active' : ''}`}
                            role="menuitem"
                            aria-current={currentPage === 'home' ? 'page' : undefined}
                        >
                            Services
                        </button>
                        <button
                            onClick={() => onNavigate('booking')}
                            className={`navbar__link ${currentPage === 'booking' ? 'navbar__link--active' : ''}`}
                            role="menuitem"
                            aria-current={currentPage === 'booking' ? 'page' : undefined}
                        >
                            Book Now
                        </button>
                        <button
                            onClick={() => onNavigate('appointments')}
                            className={`navbar__link ${currentPage === 'appointments' ? 'navbar__link--active' : ''}`}
                            role="menuitem"
                            aria-current={currentPage === 'appointments' ? 'page' : undefined}
                        >
                            My Appointments
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="navbar__theme-toggle"
                            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDarkMode ? (
                                <Sun className="icon" aria-hidden="true" />
                            ) : (
                                <Moon className="icon" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
