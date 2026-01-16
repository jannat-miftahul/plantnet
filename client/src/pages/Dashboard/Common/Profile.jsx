import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useState } from "react";
import {
    FiUser,
    FiMail,
    FiShield,
    FiCalendar,
    FiEdit3,
    FiCamera,
    FiMapPin,
    FiPhone,
    FiSettings,
    FiLogOut,
    FiShoppingBag,
    FiHeart,
    FiPackage,
    FiStar,
    FiCheckCircle,
    FiClock,
} from "react-icons/fi";

const Profile = () => {
    const { user, loading, logOut } = useAuth();
    const [role, isLoading] = useRole();
    const [activeTab, setActiveTab] = useState("overview");

    if (loading || isLoading) return <LoadingSpinner />;

    // Mock stats based on role
    const stats =
        role === "seller"
            ? [
                { label: "Products Listed", value: "24", icon: FiPackage },
                {
                    label: "Total Sales",
                    value: "$2,450",
                    icon: FiShoppingBag,
                },
                { label: "Rating", value: "4.8", icon: FiStar },
                { label: "Orders", value: "156", icon: FiCheckCircle },
            ]
            : role === "admin"
                ? [
                    { label: "Users Managed", value: "1,234", icon: FiUser },
                    { label: "Total Plants", value: "456", icon: FiPackage },
                    { label: "Transactions", value: "$45K", icon: FiShoppingBag },
                    { label: "Reviews", value: "892", icon: FiStar },
                ]
                : [
                    { label: "Orders", value: "12", icon: FiShoppingBag },
                    { label: "Wishlist", value: "8", icon: FiHeart },
                    { label: "Reviews", value: "6", icon: FiStar },
                    { label: "Points", value: "450", icon: FiCheckCircle },
                ];



    const getRoleBadgeColor = () => {
        switch (role) {
            case "admin":
                return "bg-gradient-to-r from-purple-500 to-indigo-600";
            case "seller":
                return "bg-gradient-to-r from-amber-500 to-orange-600";
            default:
                return "bg-gradient-to-r from-plant-500 to-green-600";
        }
    };

    const getRoleEmoji = () => {
        switch (role) {
            case "admin":
                return "👑";
            case "seller":
                return "🏪";
            default:
                return "🌱";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-plant-50/50 via-white to-plant-50/30 py-8 px-4">
            <Helmet>
                <title>My Profile | PlantNet Dashboard</title>
            </Helmet>

            <div className="max-w-5xl mx-auto space-y-6">
                {/* Profile Header Card */}
                <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl">
                    {/* Cover Image / Gradient */}
                    <div className="h-40 md:h-48 bg-gradient-to-r from-plant-500 via-plant-600 to-green-600 relative">
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-4 left-8 text-4xl">
                                🌿
                            </div>
                            <div className="absolute bottom-4 right-8 text-4xl">
                                🌱
                            </div>
                            <div className="absolute top-8 right-1/4 text-3xl">
                                ✨
                            </div>
                        </div>
                        {/* Edit Cover Button */}
                        <button className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 transition-colors flex items-center gap-2">
                            <FiCamera className="w-4 h-4" />
                            Edit Cover
                        </button>
                    </div>

                    {/* Profile Info */}
                    <div className="px-6 md:px-8 pb-6">
                        <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16 md:-mt-12">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl bg-white">
                                    <img
                                        src={
                                            user?.photoURL ||
                                            "https://via.placeholder.com/150"
                                        }
                                        alt={user?.displayName}
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                                <button className="absolute bottom-2 right-2 w-8 h-8 rounded-lg bg-plant-500 text-white flex items-center justify-center hover:bg-plant-600 transition-colors shadow-lg">
                                    <FiCamera className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Name & Role */}
                            <div className="flex-1 md:pb-2">
                                <div className="flex flex-wrap items-center gap-3 mb-1">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                        {user?.displayName || "User"}
                                    </h1>
                                    <span
                                        className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getRoleBadgeColor()}`}
                                    >
                                        {getRoleEmoji()}{" "}
                                        {role?.charAt(0).toUpperCase() +
                                            role?.slice(1)}
                                    </span>
                                </div>
                                <p className="text-gray-500 flex items-center gap-2">
                                    <FiMail className="w-4 h-4" />
                                    {user?.email}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button className="px-5 py-2.5 rounded-xl bg-plant-500 hover:bg-plant-600 text-white font-medium flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-plant-500/30">
                                    <FiEdit3 className="w-4 h-4" />
                                    Edit Profile
                                </button>
                                <button className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                                    <FiSettings className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-plant-50 flex items-center justify-center group-hover:bg-plant-100 transition-colors">
                                        <Icon className="w-5 h-5 text-plant-600" />
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {stat.label}
                                </div>
                            </div>
                        );
                    })}
                </div>


            </div>
        </div>
    );
};

export default Profile;
