import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
    FiHeart,
    FiSun,
    FiDroplet,
    FiWind,
    FiAward,
    FiUsers,
    FiPackage,
    FiSmile,
    FiArrowRight,
    FiStar,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Cute plant character SVG component
const PlantCharacter = ({ className = "", expression = "happy" }) => {
    const expressions = {
        happy: "M 35 45 Q 40 50 45 45",
        love: "M 35 47 Q 40 52 45 47",
        wink: "M 35 45 Q 40 50 45 45",
    };

    return (
        <svg
            viewBox="0 0 80 100"
            className={`${className}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Pot */}
            <path
                d="M 20 70 L 25 95 L 55 95 L 60 70 Z"
                fill="#D97706"
                className="drop-shadow-lg"
            />
            <path d="M 18 65 L 62 65 L 60 70 L 20 70 Z" fill="#B45309" />
            <ellipse cx="40" cy="65" rx="22" ry="5" fill="#92400E" />
            {/* Soil */}
            <ellipse cx="40" cy="65" rx="18" ry="4" fill="#57534E" />
            {/* Stem */}
            <path
                d="M 40 65 Q 38 50 40 35"
                stroke="#22C55E"
                strokeWidth="4"
                strokeLinecap="round"
            />
            {/* Leaves */}
            <ellipse
                cx="28"
                cy="40"
                rx="12"
                ry="8"
                fill="#4ADE80"
                transform="rotate(-30 28 40)"
            />
            <ellipse
                cx="52"
                cy="40"
                rx="12"
                ry="8"
                fill="#4ADE80"
                transform="rotate(30 52 40)"
            />
            <ellipse cx="40" cy="25" rx="10" ry="15" fill="#22C55E" />
            {/* Face */}
            <circle cx="35" cy="38" r="3" fill="#166534" /> {/* Left eye */}
            {expression === "wink" ? (
                <path
                    d="M 42 38 Q 45 36 48 38"
                    stroke="#166534"
                    strokeWidth="2"
                    fill="none"
                />
            ) : (
                <circle cx="45" cy="38" r="3" fill="#166534" />
            )}
            {/* Blush */}
            <circle cx="30" cy="43" r="4" fill="#FDA4AF" opacity="0.6" />
            <circle cx="50" cy="43" r="4" fill="#FDA4AF" opacity="0.6" />
            {/* Mouth */}
            <path
                d={expressions[expression]}
                stroke="#166534"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
};

// Floating leaf decoration
const FloatingLeaf = ({ delay = 0, left = "10%" }) => (
    <div
        className="absolute text-plant-400 opacity-20 animate-float pointer-events-none"
        style={{
            left,
            top: `${Math.random() * 60 + 10}%`,
            animationDelay: `${delay}s`,
            fontSize: `${Math.random() * 30 + 20}px`,
        }}
    >
        🌿
    </div>
);

PlantCharacter.propTypes = {
    className: PropTypes.string,
    expression: PropTypes.oneOf(["happy", "love", "wink"]),
};

FloatingLeaf.propTypes = {
    delay: PropTypes.number,
    left: PropTypes.string,
};

const About = () => {
    const [plantsCount, setPlantsCount] = useState(0);
    const [customersCount, setCustomersCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);

    // Animate counters on mount
    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const plantTarget = 500;
        const customerTarget = 10000;
        const orderTarget = 25000;

        let step = 0;
        const interval = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

            setPlantsCount(Math.floor(plantTarget * eased));
            setCustomersCount(Math.floor(customerTarget * eased));
            setOrdersCount(Math.floor(orderTarget * eased));

            if (step >= steps) clearInterval(interval);
        }, duration / steps);

        return () => clearInterval(interval);
    }, []);

    const values = [
        {
            icon: FiSun,
            title: "Sustainable Growth",
            description:
                "We source plants from eco-friendly nurseries and use sustainable packaging.",
            color: "from-amber-400 to-orange-500",
            bgColor: "bg-amber-50",
        },
        {
            icon: FiDroplet,
            title: "Expert Care Tips",
            description:
                "Every plant comes with personalized care instructions to help it thrive.",
            color: "from-sky-400 to-blue-500",
            bgColor: "bg-sky-50",
        },
        {
            icon: FiHeart,
            title: "Plant Health Guarantee",
            description:
                "If your plant arrives unhappy, we'll replace it or refund you. No questions asked!",
            color: "from-pink-400 to-rose-500",
            bgColor: "bg-pink-50",
        },
        {
            icon: FiWind,
            title: "Carbon Positive",
            description:
                "For every order, we plant a tree. Your purchase helps reforest the planet!",
            color: "from-plant-400 to-teal-500",
            bgColor: "bg-plant-50",
        },
    ];

    const team = [
        {
            name: "Flora Green",
            role: "Founder & Plant Whisperer",
            emoji: "👩‍🌾",
            quote: "Every plant has a story to tell",
        },
        {
            name: "Oliver Roots",
            role: "Head of Horticulture",
            emoji: "🧑‍🔬",
            quote: "Science meets nature",
        },
        {
            name: "Lily Bloom",
            role: "Customer Happiness",
            emoji: "👩‍💼",
            quote: "Your smile is our sunshine",
        },
        {
            name: "Theo Leafson",
            role: "Delivery Captain",
            emoji: "🚚",
            quote: "Plants delivered with love",
        },
    ];

    const milestones = [
        { year: "2020", event: "PlantNet was born in a tiny apartment 🌱" },
        { year: "2021", event: "Reached 1,000 happy plant parents! 🎉" },
        { year: "2022", event: "Launched same-day delivery 🚀" },
        { year: "2023", event: "Planted 10,000 trees worldwide 🌍" },
        { year: "2024", event: "Opened our first greenhouse showroom 🏡" },
        { year: "2025", event: "You're here! Let's grow together 💚" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-plant-50 via-white to-plant-50/30">
            <Helmet>
                <title>About Us | PlantNet - Our Story & Mission</title>
                <meta
                    name="description"
                    content="Learn about PlantNet's mission to bring joy through plants. Discover our story, values, and the team behind your favorite plant shop."
                />
            </Helmet>

            {/* Floating Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <FloatingLeaf delay={0} left="5%" />
                <FloatingLeaf delay={1} left="15%" />
                <FloatingLeaf delay={2} left="85%" />
                <FloatingLeaf delay={1.5} left="92%" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-12 pb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-plant-100 text-plant-700 text-sm font-medium mb-6 animate-fade-in">
                                <FiHeart className="w-4 h-4" />
                                Made with love for plant lovers
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                We&apos;re on a mission to make the world{" "}
                                <span className="gradient-text">greener</span>{" "}
                                🌿
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                                PlantNet started with a simple dream: to help
                                everyone experience the joy of nurturing plants.
                                From tiny succulents to majestic monstera,
                                we&apos;re here to be your plant-parenting
                                partner!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    to="/shop"
                                    className="btn-plant inline-flex items-center justify-center gap-2"
                                >
                                    Explore Plants
                                    <FiArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="px-6 py-2.5 rounded-full font-medium border-2 border-plant-500 text-plant-600 hover:bg-plant-50 transition-all duration-300"
                                >
                                    Say Hello! 👋
                                </Link>
                            </div>
                        </div>

                        {/* Right - Cute Plant Character */}
                        <div className="flex-1 flex justify-center relative">
                            <div className="relative">
                                <div className="absolute -inset-8 bg-gradient-to-br from-plant-200 to-leaf-light/30 rounded-full blur-3xl opacity-50" />
                                <div className="relative animate-float">
                                    <PlantCharacter
                                        className="w-64 h-80 md:w-80 md:h-96 drop-shadow-2xl"
                                        expression="happy"
                                    />
                                </div>
                                {/* Sparkles */}
                                <div className="absolute top-10 left-0 animate-pulse text-2xl">
                                    ✨
                                </div>
                                <div
                                    className="absolute top-20 right-0 animate-pulse text-xl"
                                    style={{ animationDelay: "0.5s" }}
                                >
                                    💚
                                </div>
                                <div
                                    className="absolute bottom-32 left-10 animate-pulse text-lg"
                                    style={{ animationDelay: "1s" }}
                                >
                                    🌟
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-plant-100 flex items-center justify-center text-plant-600 group-hover:scale-110 transition-transform duration-300">
                                <FiPackage className="w-8 h-8" />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                                {plantsCount}+
                            </div>
                            <p className="text-gray-500 text-sm">
                                Plant Varieties
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform duration-300">
                                <FiUsers className="w-8 h-8" />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                                {customersCount.toLocaleString()}+
                            </div>
                            <p className="text-gray-500 text-sm">
                                Happy Customers
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform duration-300">
                                <FiSmile className="w-8 h-8" />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                                {ordersCount.toLocaleString()}+
                            </div>
                            <p className="text-gray-500 text-sm">
                                Plants Delivered
                            </p>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform duration-300">
                                <FiAward className="w-8 h-8" />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                                4.9
                            </div>
                            <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
                                <FiStar className="w-3 h-3 text-amber-400 fill-amber-400" />
                                Customer Rating
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-plant-600 font-semibold text-sm uppercase tracking-wider">
                            What We Believe In
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                            Our Core Values 💪
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            These aren&apos;t just words on a wall—they&apos;re
                            the principles that guide everything we do, from
                            seed to shipment.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={index}
                                    className={`${value.bgColor} rounded-3xl p-6 hover-lift cursor-default group`}
                                >
                                    <div
                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Our Story Timeline */}
            <section className="py-20 bg-gradient-to-b from-white to-plant-50/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-plant-600 font-semibold text-sm uppercase tracking-wider">
                            Our Journey
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                            The PlantNet Story 📖
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-plant-300 via-plant-500 to-plant-300" />

                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`relative flex items-center gap-8 mb-8 ${
                                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                            >
                                {/* Content */}
                                <div
                                    className={`flex-1 ${
                                        index % 2 === 0 ? "md:text-right" : ""
                                    } ml-16 md:ml-0`}
                                >
                                    <div className="glass rounded-2xl p-6 inline-block hover-lift">
                                        <span className="text-plant-600 font-bold text-lg">
                                            {milestone.year}
                                        </span>
                                        <p className="text-gray-700 mt-1">
                                            {milestone.event}
                                        </p>
                                    </div>
                                </div>

                                {/* Dot */}
                                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-plant-500 border-4 border-white shadow-lg z-10" />

                                {/* Spacer for alternating layout on desktop */}
                                <div className="hidden md:block flex-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
