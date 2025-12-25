import React, { useState } from 'react';
import { BookingProvider, ThemeProvider } from './context';
import { Navbar, Footer } from './components';
import { HomePage, BookingPage, ConfirmationPage, MyAppointmentsPage } from './pages';
import './styles/index.css';

/**
 * Main App Component
 * Root component with routing, theme provider, and layout
 */
const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [pageData, setPageData] = useState(null);

    /**
     * Navigate to a different page
     * @param {string} page - Page name
     * @param {any} data - Optional data to pass to the page
     */
    const navigate = (page, data = null) => {
        setCurrentPage(page);
        setPageData(data);
        window.scrollTo(0, 0);
    };

    /**
     * Render the current page
     */
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onNavigate={navigate} />;
            case 'booking':
                return <BookingPage onNavigate={navigate} initialServices={pageData} />;
            case 'confirmation':
                return <ConfirmationPage bookingData={pageData} onNavigate={navigate} />;
            case 'appointments':
                return <MyAppointmentsPage onNavigate={navigate} />;
            default:
                return <HomePage onNavigate={navigate} />;
        }
    };

    return (
        <ThemeProvider>
            <BookingProvider>
                <div className="app">
                    <a href="#main-content" className="skip-link">
                        Skip to main content
                    </a>
                    <Navbar currentPage={currentPage} onNavigate={navigate} />
                    <main id="main-content" className="main-content" role="main">
                        {renderPage()}
                    </main>
                    <Footer />
                </div>
            </BookingProvider>
        </ThemeProvider>
    );
};

export default App;
