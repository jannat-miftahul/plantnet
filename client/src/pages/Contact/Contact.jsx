import { Helmet } from "react-helmet-async";
import { useState } from "react";
import PropTypes from "prop-types";
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiClock,
    FiSend,
    FiMessageCircle,
    FiChevronDown,
    FiInstagram,
    FiTwitter,
    FiFacebook,
    FiCheckCircle,
} from "react-icons/fi";
import Container from "../../components/Shared/Container";

// FAQ Data
const faqs = [
    {
        question: "How do I care for my new plant?",
        answer: "Each plant comes with a detailed care card! Generally, most indoor plants need indirect light, water when the top inch of soil is dry, and occasional fertilizing during the growing season. Check your specific plant's care guide or contact us for personalized advice!",
    },
    {
        question: "What's your shipping policy?",
        answer: "We ship plants Monday-Wednesday to ensure they don't sit in transit over weekends. Shipping is free on orders over $50! Plants are carefully packaged with eco-friendly materials to keep them safe and healthy during their journey to you. 🌿",
    },
    {
        question: "Do you offer plant replacements?",
        answer: "Absolutely! We have a 30-day Plant Health Guarantee. If your plant arrives damaged or doesn't survive the first month despite proper care, we'll replace it for free or issue a full refund. Just send us a photo and we'll take care of the rest! 💚",
    },
    {
        question: "Can I visit your greenhouse?",
        answer: "Yes! Our greenhouse in GreenVille is open for visits Thursday-Sunday, 10am-5pm. Come meet our plants, get expert advice, and maybe take home a new green friend! We also host monthly workshops. 🌱",
    },
    {
        question: "Do you offer gift wrapping?",
        answer: "We sure do! During checkout, you can add our special plant gift wrapping made from recycled kraft paper with a cute plant-themed card. It's the perfect way to surprise a plant lover in your life! 🎁",
    },
];

// Contact methods
const contactMethods = [
    {
        icon: FiMail,
        title: "Email Us",
        subtitle: "We'll respond within 24 hours",
        value: "hello@plantnet.com",
        link: "mailto:hello@plantnet.com",
        color: "from-blue-400 to-blue-600",
        bgColor: "bg-blue-50",
    },
    {
        icon: FiPhone,
        title: "Call Us",
        subtitle: "Mon-Fri, 9am-6pm EST",
        value: "+1 (555) 123-4567",
        link: "tel:+15551234567",
        color: "from-green-400 to-green-600",
        bgColor: "bg-green-50",
    },
    {
        icon: FiMapPin,
        title: "Visit Us",
        subtitle: "Our greenhouse is open!",
        value: "123 Garden Lane, GreenVille",
        link: "#map",
        color: "from-amber-400 to-amber-600",
        bgColor: "bg-amber-50",
    },
    {
        icon: FiClock,
        title: "Hours",
        subtitle: "Thu-Sun",
        value: "10:00 AM - 5:00 PM",
        link: null,
        color: "from-purple-400 to-purple-600",
        bgColor: "bg-purple-50",
    },
];

// FAQ Item Component
const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-5 flex items-center justify-between text-left group"
            >
                <span className="font-semibold text-gray-900 group-hover:text-plant-600 transition-colors pr-4">
                    {question}
                </span>
                <FiChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-plant-600" : ""
                    }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 pb-5" : "max-h-0"
                }`}
            >
                <p className="text-gray-600 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

FAQItem.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [openFAQ, setOpenFAQ] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>
                    Contact Us | PlantNet - We&apos;d Love to Hear From You
                </title>
                <meta
                    name="description"
                    content="Get in touch with PlantNet! We're here to help with plant care advice, orders, and any questions. Contact us via email, phone, or visit our greenhouse."
                />
            </Helmet>

            {/* Hero Section */}
            <section className="relative overflow-hidden gradient-plant py-16 md:py-24">
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">
                        💌
                    </div>
                    <div
                        className="absolute bottom-10 right-10 text-6xl opacity-20 animate-float"
                        style={{ animationDelay: "1s" }}
                    >
                        🌿
                    </div>
                    <div
                        className="absolute top-1/2 left-1/4 text-4xl opacity-10 animate-float"
                        style={{ animationDelay: "0.5s" }}
                    >
                        ✨
                    </div>
                    <div className="absolute top-1/3 right-1/4 text-4xl opacity-10 animate-float">
                        🌱
                    </div>
                </div>

                <Container>
                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
                            <FiMessageCircle className="w-4 h-4" />
                            We&apos;d love to hear from you!
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Get in Touch 💬
                        </h1>

                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                            Have a question about plant care? Need help with an
                            order? Or just want to say hi? We&apos;re always
                            happy to chat with fellow plant lovers!
                        </p>
                    </div>
                </Container>

                {/* Wave separator */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-12 -mt-8 relative z-10">
                <Container>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {contactMethods.map((method, index) => {
                            const Icon = method.icon;
                            return (
                                <a
                                    key={index}
                                    href={method.link || "#"}
                                    className={`group p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 ${
                                        !method.link
                                            ? "cursor-default"
                                            : "cursor-pointer"
                                    }`}
                                >
                                    <div
                                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                        {method.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {method.subtitle}
                                    </p>
                                    <p className="text-plant-600 font-medium group-hover:text-plant-700 transition-colors">
                                        {method.value}
                                    </p>
                                </a>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* Main Content - Form & FAQ */}
            <section className="py-16 md:py-20">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Contact Form */}
                        <div>
                            <div className="mb-8">
                                <span className="text-plant-600 font-semibold text-sm uppercase tracking-wider">
                                    Send a Message
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                                    Drop Us a Line 🌱
                                </h2>
                                <p className="text-gray-600 mt-3">
                                    Fill out the form below and we&apos;ll get
                                    back to you as soon as possible!
                                </p>
                            </div>

                            {isSubmitted ? (
                                <div className="bg-plant-50 border border-plant-200 rounded-2xl p-8 text-center animate-fade-in">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-plant-500 flex items-center justify-center">
                                        <FiCheckCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-plant-700 mb-2">
                                        Message Sent! 🎉
                                    </h3>
                                    <p className="text-plant-600">
                                        Thank you for reaching out. We&apos;ll
                                        get back to you within 24 hours!
                                    </p>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-plant-400 focus:ring-2 focus:ring-plant-100 transition-all outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="john@example.com"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-plant-400 focus:ring-2 focus:ring-plant-100 transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Subject
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-plant-400 focus:ring-2 focus:ring-plant-100 transition-all outline-none bg-white"
                                        >
                                            <option value="">
                                                Select a topic...
                                            </option>
                                            <option value="order">
                                                🛒 Order Inquiry
                                            </option>
                                            <option value="care">
                                                🌿 Plant Care Question
                                            </option>
                                            <option value="returns">
                                                🔄 Returns & Refunds
                                            </option>
                                            <option value="wholesale">
                                                📦 Wholesale Inquiry
                                            </option>
                                            <option value="feedback">
                                                💬 Feedback & Suggestions
                                            </option>
                                            <option value="other">
                                                ✨ Something Else
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Your Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={5}
                                            placeholder="Tell us how we can help..."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-plant-400 focus:ring-2 focus:ring-plant-100 transition-all outline-none resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-plant-500 hover:bg-plant-600 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-plant-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <FiSend className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* FAQ Section */}
                        <div>
                            <div className="mb-8">
                                <span className="text-plant-600 font-semibold text-sm uppercase tracking-wider">
                                    Have Questions?
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                                    FAQ 🤔
                                </h2>
                                <p className="text-gray-600 mt-3">
                                    Find quick answers to common questions
                                    below!
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="px-6">
                                    {faqs.map((faq, index) => (
                                        <FAQItem
                                            key={index}
                                            question={faq.question}
                                            answer={faq.answer}
                                            isOpen={openFAQ === index}
                                            onClick={() =>
                                                setOpenFAQ(
                                                    openFAQ === index
                                                        ? -1
                                                        : index
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-8 p-6 bg-gradient-to-br from-plant-50 to-plant-100/50 rounded-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">💬</span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Connect With Us
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Follow us for plant tips & behind
                                            the scenes!
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                                    >
                                        <FiInstagram className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                                    >
                                        <FiTwitter className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                                    >
                                        <FiFacebook className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Map Section */}
            <section id="map" className="py-16 bg-plant-50/50">
                <Container>
                    <div className="text-center mb-10">
                        <span className="text-plant-600 font-semibold text-sm uppercase tracking-wider">
                            Find Us
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                            Visit Our Greenhouse 🌿
                        </h2>
                        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                            Come see our plants in person! Our greenhouse is
                            open Thursday through Sunday. We&apos;d love to help
                            you find your perfect plant!
                        </p>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        {/* Placeholder map with styled background */}
                        <div className="h-80 md:h-96 bg-gradient-to-br from-plant-200 to-plant-300 relative">
                            {/* Decorative map-like elements */}
                            <div className="absolute inset-0 opacity-30">
                                <svg
                                    className="w-full h-full"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <defs>
                                        <pattern
                                            id="grid"
                                            width="40"
                                            height="40"
                                            patternUnits="userSpaceOnUse"
                                        >
                                            <path
                                                d="M 40 0 L 0 0 0 40"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="1"
                                            />
                                        </pattern>
                                    </defs>
                                    <rect
                                        width="100%"
                                        height="100%"
                                        fill="url(#grid)"
                                    />
                                </svg>
                            </div>

                            {/* Location Pin */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-plant-500 flex items-center justify-center animate-bounce shadow-xl">
                                        <FiMapPin className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                        <div className="px-4 py-2 bg-white rounded-xl shadow-lg">
                                            <p className="font-semibold text-gray-900">
                                                PlantNet Greenhouse
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                123 Garden Lane
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Corner decorations */}
                            <div className="absolute top-4 left-4 text-4xl opacity-50">
                                🌳
                            </div>
                            <div className="absolute top-4 right-4 text-4xl opacity-50">
                                🌲
                            </div>
                            <div className="absolute bottom-4 left-4 text-4xl opacity-50">
                                🌴
                            </div>
                            <div className="absolute bottom-4 right-4 text-4xl opacity-50">
                                🌵
                            </div>
                        </div>

                        {/* Address bar */}
                        <div className="bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-plant-100 flex items-center justify-center flex-shrink-0">
                                    <FiMapPin className="w-6 h-6 text-plant-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        123 Garden Lane, GreenVille, CA 90210
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Open Thu-Sun, 10am-5pm
                                    </p>
                                </div>
                            </div>
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-xl bg-plant-500 hover:bg-plant-600 text-white font-medium transition-colors"
                            >
                                Get Directions
                            </a>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-20">
                <Container>
                    <div className="relative overflow-hidden rounded-3xl gradient-forest p-8 md:p-12 lg:p-16 text-center">
                        {/* Decorations */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-leaf-light/10 rounded-full blur-2xl" />
                        <div className="absolute top-8 left-8 text-4xl opacity-20">
                            🌿
                        </div>
                        <div className="absolute bottom-8 right-8 text-4xl opacity-20">
                            🌱
                        </div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <span className="text-5xl mb-4 block">🌼</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Can&apos;t Wait to Hear From You!
                            </h2>
                            <p className="text-plant-200/80 mb-8">
                                Whether you&apos;re a seasoned plant parent or
                                just starting your green journey, we&apos;re
                                here to help. Let&apos;s grow together! 🌱
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="mailto:hello@plantnet.com"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-plant-700 font-semibold hover:bg-plant-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                                >
                                    <FiMail className="w-5 h-5" />
                                    Email Us Now
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default Contact;
