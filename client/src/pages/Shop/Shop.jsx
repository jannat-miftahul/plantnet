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

            {/* Main Content */}
            <section className="py-8">
                <Container>
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters - Desktop */}
                        <aside className="hidden lg:block w-64 flex-shrink-0">
                            <div className="sticky top-36 space-y-6">
                                {/* Filter Header */}
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <FiSliders className="w-5 h-5" />
                                        Filters
                                    </h3>
                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm text-plant-600 hover:text-plant-700 font-medium"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                </div>

                                {/* Price Range Filter */}
                                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                    <h4 className="font-semibold text-gray-900 mb-4">
                                        Price Range
                                    </h4>
                                    <div className="space-y-2">
                                        {priceRanges.map((range) => (
                                            <label
                                                key={range.id}
                                                className="flex items-center gap-3 cursor-pointer group"
                                            >
                                                <input
                                                    type="radio"
                                                    name="price"
                                                    checked={
                                                        selectedPriceRange ===
                                                        range.id
                                                    }
                                                    onChange={() =>
                                                        setSelectedPriceRange(
                                                            range.id,
                                                        )
                                                    }
                                                    className="w-4 h-4 text-plant-600 focus:ring-plant-500 border-gray-300"
                                                />
                                                <span className="text-gray-700 group-hover:text-plant-600 transition-colors">
                                                    {range.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="bg-gradient-to-br from-plant-50 to-plant-100/50 rounded-2xl p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-plant-500 flex items-center justify-center">
                                            <FiPackage className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-plant-700">
                                                {plants.length}
                                            </div>
                                            <div className="text-sm text-plant-600">
                                                Total Plants
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-plant-700/80">
                                        Browse our entire collection of
                                        beautiful, healthy plants.
                                    </p>
                                </div>

                                {/* Help Card */}
                                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                    <div className="text-3xl mb-3">🌱</div>
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        Need Help Choosing?
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Our plant experts are here to help you
                                        find the perfect plant.
                                    </p>
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center gap-2 text-plant-600 font-medium text-sm hover:text-plant-700 transition-colors"
                                    >
                                        Contact Us
                                        <FiArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* Products Grid */}
                        <div className="flex-1">
                            {/* Toolbar */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <p className="text-gray-600">
                                        Showing{" "}
                                        <span className="font-semibold text-gray-900">
                                            {filteredPlants.length}
                                        </span>{" "}
                                        {filteredPlants.length === 1
                                            ? "plant"
                                            : "plants"}
                                    </p>

                                    {/* Mobile Filter Button */}
                                    <button
                                        onClick={() => setShowFilters(true)}
                                        className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        <FiFilter className="w-4 h-4" />
                                        Filters
                                    </button>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* Sort Dropdown */}
                                    <div className="relative">
                                        <button
                                            onClick={() =>
                                                setShowSortDropdown(
                                                    !showSortDropdown,
                                                )
                                            }
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:border-plant-300 transition-colors"
                                        >
                                            Sort by:{" "}
                                            {
                                                sortOptions.find(
                                                    (o) =>
                                                        o.id === selectedSort,
                                                )?.label
                                            }
                                            <FiChevronDown
                                                className={`w-4 h-4 transition-transform ${
                                                    showSortDropdown
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />
                                        </button>

                                        {showSortDropdown && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-10"
                                                    onClick={() =>
                                                        setShowSortDropdown(
                                                            false,
                                                        )
                                                    }
                                                />
                                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-slide-down">
                                                    {sortOptions.map(
                                                        (option) => (
                                                            <button
                                                                key={option.id}
                                                                onClick={() => {
                                                                    setSelectedSort(
                                                                        option.id,
                                                                    );
                                                                    setShowSortDropdown(
                                                                        false,
                                                                    );
                                                                }}
                                                                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                                                    selectedSort ===
                                                                    option.id
                                                                        ? "bg-plant-50 text-plant-700 font-medium"
                                                                        : "text-gray-700 hover:bg-gray-50"
                                                                }`}
                                                            >
                                                                {option.label}
                                                            </button>
                                                        ),
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* View Toggle */}
                                    <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-gray-100">
                                        <button
                                            onClick={() => setViewMode("grid")}
                                            className={`p-2 rounded-lg transition-colors ${
                                                viewMode === "grid"
                                                    ? "bg-white text-plant-600 shadow-sm"
                                                    : "text-gray-500 hover:text-gray-700"
                                            }`}
                                            aria-label="Grid view"
                                        >
                                            <FiGrid className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode("list")}
                                            className={`p-2 rounded-lg transition-colors ${
                                                viewMode === "list"
                                                    ? "bg-white text-plant-600 shadow-sm"
                                                    : "text-gray-500 hover:text-gray-700"
                                            }`}
                                            aria-label="List view"
                                        >
                                            <FiList className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Active Filters Tags */}
                            {hasActiveFilters && (
                                <div className="flex flex-wrap items-center gap-2 mb-6">
                                    <span className="text-sm text-gray-500">
                                        Active filters:
                                    </span>
                                    {searchQuery && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-plant-100 text-plant-700 text-sm">
                                            Search: {searchQuery}
                                            <button
                                                onClick={() =>
                                                    setSearchQuery("")
                                                }
                                                className="hover:text-plant-900"
                                            >
                                                <FiX className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                    {selectedCategory !== "all" && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-plant-100 text-plant-700 text-sm">
                                            Category: {selectedCategory}
                                            <button
                                                onClick={() => {
                                                    setSelectedCategory("all");
                                                    setSearchParams({});
                                                }}
                                                className="hover:text-plant-900"
                                            >
                                                <FiX className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                    {selectedPriceRange !== "all" && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-plant-100 text-plant-700 text-sm">
                                            Price:{" "}
                                            {
                                                priceRanges.find(
                                                    (r) =>
                                                        r.id ===
                                                        selectedPriceRange,
                                                )?.label
                                            }
                                            <button
                                                onClick={() =>
                                                    setSelectedPriceRange("all")
                                                }
                                                className="hover:text-plant-900"
                                            >
                                                <FiX className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Loading State */}
                            {isLoading ? (
                                <div className="py-20">
                                    <LoadingSpinner />
                                </div>
                            ) : filteredPlants.length > 0 ? (
                                /* Products Grid */
                                <div
                                    className={
                                        viewMode === "grid"
                                            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                                            : "space-y-4"
                                    }
                                >
                                    {filteredPlants.map((plant, index) => (
                                        <div
                                            key={plant._id}
                                            className="animate-fade-in"
                                            style={{
                                                animationDelay: `${
                                                    index * 50
                                                }ms`,
                                            }}
                                        >
                                            {viewMode === "grid" ? (
                                                <Card plant={plant} />
                                            ) : (
                                                /* List View Card */
                                                <Link
                                                    to={`/plant/${plant._id}`}
                                                    className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-plant-200"
                                                >
                                                    <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-plant-50">
                                                        <img
                                                            src={plant.image}
                                                            alt={plant.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 flex flex-col justify-center">
                                                        <span className="text-xs font-medium text-plant-600 bg-plant-50 px-2 py-1 rounded-full w-fit mb-2">
                                                            {plant.category}
                                                        </span>
                                                        <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                                            {plant.name}
                                                        </h3>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xl font-bold text-plant-600">
                                                                ${plant.price}
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                •{" "}
                                                                {plant.quantity}{" "}
                                                                in stock
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="px-4 py-2 rounded-xl bg-plant-50 text-plant-700 font-medium hover:bg-plant-100 transition-colors">
                                                            View
                                                        </span>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* Empty State */
                                <div className="py-20 text-center">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        No plants found
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Try adjusting your filters or search
                                        query
                                    </p>
                                    <button
                                        onClick={clearFilters}
                                        className="btn-plant"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default Shop;
