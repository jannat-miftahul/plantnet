import { Helmet } from "react-helmet-async";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    FiSearch,
    FiFilter,
    FiGrid,
    FiList,
    FiChevronDown,
    FiX,
    FiSliders,
    FiPackage,
    FiArrowRight,
} from "react-icons/fi";
import Container from "../../components/Shared/Container";
import Card from "../../components/Home/Card";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

// Category filter data
const categories = [
    { id: "all", name: "All Plants", emoji: "🌿", count: 0 },
    { id: "indoor", name: "Indoor", emoji: "🪴", count: 0 },
    { id: "outdoor", name: "Outdoor", emoji: "🌳", count: 0 },
    { id: "succulent", name: "Succulents", emoji: "🌵", count: 0 },
    { id: "flowering", name: "Flowering", emoji: "🌸", count: 0 },
    { id: "herbs", name: "Herbs", emoji: "🌿", count: 0 },
];

// Price ranges
const priceRanges = [
    { id: "all", label: "All Prices", min: 0, max: Infinity },
    { id: "budget", label: "Under $50", min: 0, max: 50 },
    { id: "mid", label: "$50 - $100", min: 50, max: 100 },
    { id: "premium", label: "$100 - $200", min: 100, max: 200 },
    { id: "luxury", label: "Over $200", min: 200, max: Infinity },
];

// Sort options
const sortOptions = [
    { id: "featured", label: "Featured" },
    { id: "newest", label: "Newest Arrivals" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "name-asc", label: "Name: A to Z" },
    { id: "name-desc", label: "Name: Z to A" },
];

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get("category") || "all",
    );
    const [selectedPriceRange, setSelectedPriceRange] = useState("all");
    const [selectedSort, setSelectedSort] = useState("featured");
    const [viewMode, setViewMode] = useState("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    // Fetch plants
    const { data: plants = [], isLoading } = useQuery({
        queryKey: ["plants"],
        queryFn: async () => {
            const response = await axios(
                `${import.meta.env.VITE_API_URL}/plants`,
            );
            return response.data;
        },
    });

    // Update category from URL params
    useEffect(() => {
        const categoryParam = searchParams.get("category");
        if (categoryParam) {
            setSelectedCategory(categoryParam.toLowerCase());
        }
    }, [searchParams]);

    // Filter and sort plants
    const filteredPlants = useMemo(() => {
        let result = [...plants];

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (plant) =>
                    plant.name.toLowerCase().includes(query) ||
                    plant.category.toLowerCase().includes(query),
            );
        }

        // Category filter
        if (selectedCategory !== "all") {
            result = result.filter(
                (plant) =>
                    plant.category.toLowerCase() ===
                    selectedCategory.toLowerCase(),
            );
        }

        // Price filter
        const priceRange = priceRanges.find((r) => r.id === selectedPriceRange);
        if (priceRange && priceRange.id !== "all") {
            result = result.filter(
                (plant) =>
                    plant.price >= priceRange.min &&
                    plant.price < priceRange.max,
            );
        }

        // Sort
        switch (selectedSort) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
            case "name-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "newest":
                result.reverse();
                break;
            default:
                break;
        }

        return result;
    }, [
        plants,
        searchQuery,
        selectedCategory,
        selectedPriceRange,
        selectedSort,
    ]);

    // Calculate category counts
    const categoriesWithCounts = useMemo(() => {
        return categories.map((cat) => ({
            ...cat,
            count:
                cat.id === "all"
                    ? plants.length
                    : plants.filter(
                          (p) =>
                              p.category.toLowerCase() === cat.id.toLowerCase(),
                      ).length,
        }));
    }, [plants]);

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("all");
        setSelectedPriceRange("all");
        setSelectedSort("featured");
        setSearchParams({});
    };

    const hasActiveFilters =
        searchQuery ||
        selectedCategory !== "all" ||
        selectedPriceRange !== "all" ||
        selectedSort !== "featured";

    return (
        <div className="min-h-screen bg-gradient-to-b from-plant-50/30 via-white to-white">
            <Helmet>
                <title>Shop Plants | PlantNet - Browse Our Collection</title>
                <meta
                    name="description"
                    content="Browse our extensive collection of beautiful plants. Filter by category, price, and more. Free delivery on orders over $50!"
                />
            </Helmet>

            {/* Hero Banner */}
            <section className="relative overflow-hidden bg-gradient-to-r from-plant-600 to-plant-500 py-12 md:py-16">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-10 text-6xl">🌿</div>
                    <div className="absolute bottom-4 right-10 text-6xl">
                        🪴
                    </div>
                    <div className="absolute top-1/2 left-1/3 text-4xl">🌱</div>
                </div>
                <Container>
                    <div className="relative z-10 text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Shop Our Plants 🌿
                        </h1>
                        <p className="text-plant-100 max-w-2xl mx-auto mb-6">
                            Discover the perfect green companion for your space.
                            From low-maintenance succulents to statement-making
                            tropical plants.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto">
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for plants..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-plant-400 transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                                    >
                                        <FiX className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>

                {/* Wave separator */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        viewBox="0 0 1440 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
                            fill="white"
                            fillOpacity="0.1"
                        />
                    </svg>
                </div>
            </section>

            {/* Category Pills */}
            <section className="py-6 bg-white border-b border-gray-100 sticky top-16 z-20">
                <Container>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                        {categoriesWithCounts.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setSelectedCategory(category.id);
                                    if (category.id === "all") {
                                        setSearchParams({});
                                    } else {
                                        setSearchParams({
                                            category: category.id,
                                        });
                                    }
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-300 ${
                                    selectedCategory === category.id
                                        ? "bg-plant-500 text-white shadow-lg shadow-plant-500/30"
                                        : "bg-gray-100 text-gray-700 hover:bg-plant-50 hover:text-plant-700"
                                }`}
                            >
                                <span>{category.emoji}</span>
                                <span>{category.name}</span>
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                        selectedCategory === category.id
                                            ? "bg-white/20"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default Shop;
