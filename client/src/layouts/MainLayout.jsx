import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import { useEffect } from "react";

const MainLayout = () => {
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-plant-50/30 via-white to-plant-50/20">
            {/* Decorative background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-plant-200/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-leaf-light/10 to-transparent rounded-full blur-3xl" />
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 relative z-10">
                <div className="animate-fade-in">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;
