import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FiShoppingCart, FiHeart, FiEye } from "react-icons/fi";
import { useState } from "react";

const Card = ({ plant }) => {
    const { _id, name, category, quantity, price, image } = plant || {};
    const [isLiked, setIsLiked] = useState(false);
    const isInStock = quantity > 0;

    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-plant-500/10 transition-all duration-500 hover:-translate-y-2">
            {/* Image Container */}
            <div className="aspect-square w-full relative overflow-hidden bg-gradient-to-br from-plant-50 to-plant-100/50">
                <img
                    className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-700 ease-out"
                    src={image}
                    alt={name}
                    loading="lazy"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsLiked(!isLiked);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isLiked
                                ? "bg-red-500 text-white"
                                : "bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white"
                        } shadow-lg backdrop-blur-sm`}
                        aria-label="Add to wishlist"
                    >
                        <FiHeart
                            className={`w-4 h-4 ${
                                isLiked ? "fill-current" : ""
                            }`}
                        />
                    </button>
                    <Link
                        to={`/plant/${_id}`}
                        className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-plant-500 hover:text-white transition-all duration-300 shadow-lg backdrop-blur-sm"
                        aria-label="Quick view"
                    >
                        <FiEye className="w-4 h-4" />
                    </Link>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-plant-700 backdrop-blur-sm shadow-sm">
                        {category}
                    </span>
                </div>

                {/* Stock Status */}
                {!isInStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-full">
                            Out of Stock
                        </span>
                    </div>
                )}

                {/* Add to Cart Button - appears on hover */}
                <div className="absolute bottom-3 left-3 right-3 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                    <Link
                        to={`/plant/${_id}`}
                        className="w-full py-2.5 rounded-xl bg-plant-500 hover:bg-plant-600 text-white font-medium flex items-center justify-center gap-2 transition-colors duration-300 shadow-lg"
                    >
                        <FiShoppingCart className="w-4 h-4" />
                        View Details
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <Link to={`/plant/${_id}`} className="block">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-plant-600 transition-colors duration-300 line-clamp-1">
                        {name}
                    </h3>
                </Link>

                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-plant-600">
                            ${price}
                        </span>
                        {price > 20 && (
                            <span className="text-sm text-gray-400 line-through">
                                ${(price * 1.2).toFixed(0)}
                            </span>
                        )}
                    </div>

                    {isInStock && (
                        <span className="text-xs text-gray-500 bg-plant-50 px-2 py-1 rounded-full">
                            {quantity} left
                        </span>
                    )}
                </div>

                {/* Rating (decorative) */}
                <div className="flex items-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className={`w-4 h-4 ${
                                i < 4 ? "text-amber-400" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(24)</span>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    plant: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default Card;
