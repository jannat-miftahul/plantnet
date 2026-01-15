import Container from "../Container";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import {
    FiUser,
    FiLogOut,
    FiGrid,
    FiHome,
    FiShoppingBag,
    FiInfo,
    FiMail,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo-flat.png";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menus on route change
    useEffect(() => {
        setIsOpen(false);
        setMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: "Home", path: "/", icon: FiHome },
        { name: "Shop", path: "/shop", icon: FiShoppingBag },
        { name: "About", path: "/about", icon: FiInfo },
        { name: "Contact", path: "/contact", icon: FiMail },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav
                className={`fixed w-full z-50 transition-all duration-500 ${
                    scrolled
                        ? "glass shadow-lg shadow-plant-500/10 py-2"
                        : "bg-white/95 py-4"
                }`}
            >
                <Container>
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="relative">
                                <img
                                    src={logo}
                                    alt="PlantNet Logo"
                                    className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute -inset-1 bg-gradient-to-r from-plant-400 to-leaf-light rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
                            </div>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                                        isActive(link.path)
                                            ? "text-plant-600 bg-plant-50"
                                            : "text-gray-600 hover:text-plant-600 hover:bg-plant-50/50"
                                    }`}
                                >
                                    {link.name}
                                    {isActive(link.path) && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-plant-500 rounded-full" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-3">
                            {/* CTA Button - Desktop only */}
                            {!user && (
                                <Link
                                    to="/login"
                                    className="hidden md:inline-flex btn-plant text-sm"
                                >
                                    Get Started
                                </Link>
                            )}

                            {/* User Menu / Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border-2 transition-all duration-300 hover-lift ${
                                        isOpen
                                            ? "border-plant-400 bg-plant-50 shadow-glow"
                                            : "border-gray-200 hover:border-plant-300 bg-white"
                                    }`}
                                    aria-label="User menu"
                                >
                                    <div className="relative">
                                        <img
                                            className="w-9 h-9 object-cover rounded-full ring-2 ring-offset-1 ring-plant-400/30"
                                            referrerPolicy="no-referrer"
                                            src={
                                                user && user.photoURL
                                                    ? user.photoURL
                                                    : avatarImg
                                            }
                                            alt="Profile"
                                        />
                                        {user && (
                                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-plant-500 border-2 border-white rounded-full" />
                                        )}
                                    </div>
                                    <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                                        {user?.displayName || "Account"}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <div className="absolute right-0 mt-3 w-56 glass rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden animate-slide-down">
                                        {/* User Info Header */}
                                        {user && (
                                            <div className="px-4 py-3 bg-gradient-to-r from-plant-50 to-leaf-light/10 border-b border-plant-100">
                                                <p className="text-sm font-semibold text-gray-800 truncate">
                                                    {user.displayName || "User"}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                        )}

                                        <div className="py-2">
                                            {user ? (
                                                <>
                                                    <Link
                                                        to="/dashboard"
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-plant-50 hover:text-plant-700 transition-colors duration-200"
                                                    >
                                                        <FiGrid className="w-4 h-4" />
                                                        Dashboard
                                                    </Link>
                                                    <Link
                                                        to="dashboard/profile"
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-plant-50 hover:text-plant-700 transition-colors duration-200"
                                                    >
                                                        <FiUser className="w-4 h-4" />
                                                        My Profile
                                                    </Link>
                                                    <hr className="my-2 border-gray-100" />
                                                    <button
                                                        onClick={logOut}
                                                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                                    >
                                                        <FiLogOut className="w-4 h-4" />
                                                        Sign Out
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <Link
                                                        to="/login"
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-plant-50 hover:text-plant-700 transition-colors duration-200"
                                                    >
                                                        <FiUser className="w-4 h-4" />
                                                        Sign In
                                                    </Link>
                                                    <Link
                                                        to="/signup"
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-plant-600 hover:bg-plant-50 transition-colors duration-200"
                                                    >
                                                        <span className="w-4 h-4 flex items-center justify-center bg-plant-100 rounded-full text-xs">
                                                            +
                                                        </span>
                                                        Create Account
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="lg:hidden p-2 rounded-xl hover:bg-plant-50 transition-colors duration-200"
                                aria-label="Toggle mobile menu"
                            >
                                {mobileMenuOpen ? (
                                    <AiOutlineClose className="w-6 h-6 text-gray-700" />
                                ) : (
                                    <AiOutlineMenu className="w-6 h-6 text-gray-700" />
                                )}
                            </button>
                        </div>
                    </div>
                </Container>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-72 glass-dark z-50 transform transition-transform duration-300 lg:hidden ${
                    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Close Button */}
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="self-end p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-200"
                    >
                        <AiOutlineClose className="w-5 h-5 text-white" />
                    </button>

                    {/* Mobile Nav Links */}
                    <nav className="mt-8 flex flex-col gap-2">
                        {navLinks.map((link, index) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 animate-slide-up ${
                                        isActive(link.path)
                                            ? "bg-white/20 text-white"
                                            : "text-white/70 hover:text-white hover:bg-white/10"
                                    }`}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                    }}
                                >
                                    <Icon className="w-5 h-5" />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Auth Buttons */}
                    <div className="mt-auto space-y-3">
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-plant-700 font-semibold transition-all duration-300 hover:bg-plant-50"
                                >
                                    <FiGrid className="w-5 h-5" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logOut}
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 text-white font-medium transition-all duration-300 hover:bg-white/20"
                                >
                                    <FiLogOut className="w-5 h-5" />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-plant-700 font-semibold transition-all duration-300 hover:bg-plant-50"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 text-white font-medium transition-all duration-300 hover:bg-white/20"
                                >
                                    Create Account
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Spacer for fixed navbar */}
            <div className="h-16 md:h-20" />
        </>
    );
};

export default Navbar;
