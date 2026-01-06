import { Link } from "react-router-dom";
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiFacebook,
    FiTwitter,
    FiInstagram,
    FiYoutube,
    FiArrowUpRight,
    FiSend,
    FiHeart,
} from "react-icons/fi";
import { useState } from "react";
import logo from "../../../assets/images/logo-flat.png";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "Shop Plants", path: "/shop" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const customerService = [
        { name: "FAQ", path: "/faq" },
        { name: "Shipping Info", path: "/shipping" },
        { name: "Returns", path: "/returns" },
        { name: "Track Order", path: "/track" },
    ];

    const plantCategories = [
        { name: "Indoor Plants", path: "/shop?category=indoor" },
        { name: "Outdoor Plants", path: "/shop?category=outdoor" },
        { name: "Succulents", path: "/shop?category=succulents" },
        { name: "Flowering", path: "/shop?category=flowering" },
    ];

    const socialLinks = [
        {
            icon: FiFacebook,
            href: "#",
            label: "Facebook",
            color: "hover:bg-blue-600",
        },
        {
            icon: FiTwitter,
            href: "#",
            label: "Twitter",
            color: "hover:bg-sky-500",
        },
        {
            icon: FiInstagram,
            href: "#",
            label: "Instagram",
            color: "hover:bg-pink-600",
        },
        {
            icon: FiYoutube,
            href: "#",
            label: "YouTube",
            color: "hover:bg-red-600",
        },
    ];

    return (
        <footer className="relative overflow-hidden">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 gradient-forest opacity-95" />
            <div className="absolute inset-0 opacity-5">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <pattern
                            id="leaf-pattern"
                            x="0"
                            y="0"
                            width="50"
                            height="50"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle
                                cx="25"
                                cy="25"
                                r="20"
                                fill="currentColor"
                                opacity="0.3"
                            />
                        </pattern>
                    </defs>
                    <rect
                        width="100%"
                        height="100%"
                        fill="url(#leaf-pattern)"
                    />
                </svg>
            </div>

            {/* Main Footer Content */}
            <div className="relative z-10">
                {/* Newsletter Section */}
                <div className="border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="text-center lg:text-left">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    Join Our Green Community 🌿
                                </h3>
                                <p className="text-plant-200/80 text-sm md:text-base max-w-md">
                                    Subscribe to get exclusive offers, plant
                                    care tips, and be the first to know about
                                    new arrivals.
                                </p>
                            </div>
                            <form
                                onSubmit={handleSubscribe}
                                className="flex w-full max-w-md"
                            >
                                <div className="relative flex-1">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="w-full pl-4 pr-12 py-3.5 rounded-l-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-plant-400 focus:bg-white/15 transition-all duration-300"
                                        required
                                    />
                                    <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-3.5 rounded-r-xl bg-gradient-to-r from-plant-500 to-leaf-light text-white font-semibold flex items-center gap-2 hover:from-plant-400 hover:to-leaf-light transition-all duration-300 hover:shadow-glow"
                                >
                                    {subscribed ? (
                                        <>
                                            <span>Subscribed!</span>
                                            <span className="text-lg">✓</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="hidden sm:inline">
                                                Subscribe
                                            </span>
                                            <FiSend className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Main Links Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
                        {/* Brand Column */}
                        <div className="col-span-2 md:col-span-4 lg:col-span-1">
                            <Link to="/" className="inline-block mb-6 group">
                                <img
                                    src={logo}
                                    alt="PlantNet"
                                    className="h-12 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </Link>
                            <p className="text-plant-200/70 text-sm leading-relaxed mb-6">
                                Bringing nature closer to you. We provide the
                                finest selection of plants to transform your
                                space.
                            </p>
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            aria-label={social.label}
                                            className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 ${social.color} hover:scale-110`}
                                        >
                                            <Icon className="w-4 h-4" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.path}>
                                        <Link
                                            to={link.path}
                                            className="text-plant-200/70 hover:text-white text-sm flex items-center gap-1 group transition-colors duration-200"
                                        >
                                            {link.name}
                                            <FiArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Customer Service */}
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                                Customer Service
                            </h4>
                            <ul className="space-y-3">
                                {customerService.map((link) => (
                                    <li key={link.path}>
                                        <Link
                                            to={link.path}
                                            className="text-plant-200/70 hover:text-white text-sm flex items-center gap-1 group transition-colors duration-200"
                                        >
                                            {link.name}
                                            <FiArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Plant Categories */}
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                                Categories
                            </h4>
                            <ul className="space-y-3">
                                {plantCategories.map((link) => (
                                    <li key={link.path}>
                                        <Link
                                            to={link.path}
                                            className="text-plant-200/70 hover:text-white text-sm flex items-center gap-1 group transition-colors duration-200"
                                        >
                                            {link.name}
                                            <FiArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="col-span-2 md:col-span-1">
                            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                                Contact Us
                            </h4>
                            <ul className="space-y-4">
                                <li>
                                    <a
                                        href="mailto:hello@plantnet.com"
                                        className="text-plant-200/70 hover:text-white text-sm flex items-start gap-3 transition-colors duration-200"
                                    >
                                        <FiMail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        hello@plantnet.com
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="tel:+1234567890"
                                        className="text-plant-200/70 hover:text-white text-sm flex items-start gap-3 transition-colors duration-200"
                                    >
                                        <FiPhone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        +1 (234) 567-890
                                    </a>
                                </li>
                                <li className="text-plant-200/70 text-sm flex items-start gap-3">
                                    <FiMapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>
                                        123 Green Street,
                                        <br />
                                        Nature City, NC 12345
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-plant-200/60 text-sm text-center md:text-left">
                                © {new Date().getFullYear()} PlantNet Inc. All
                                rights reserved.
                            </p>
                            <div className="flex items-center gap-6">
                                <Link
                                    to="/privacy"
                                    className="text-plant-200/60 hover:text-white text-sm transition-colors duration-200"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    to="/terms"
                                    className="text-plant-200/60 hover:text-white text-sm transition-colors duration-200"
                                >
                                    Terms of Service
                                </Link>
                            </div>
                            <p className="text-plant-200/60 text-sm flex items-center gap-1">
                                Made with{" "}
                                <FiHeart className="w-4 h-4 text-red-400 animate-pulse" />{" "}
                                for plant lovers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
