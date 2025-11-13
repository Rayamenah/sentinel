import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { Product } from "../store/useProductStore";
import { toast } from "sonner";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const addToCart = useCartStore((s) => s.addToCart);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image || "",
        }, 1);
        toast.success("Added to cart!");
    };

    const rating = 4.5;

    return (
        <div
            className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative h-64 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
                <img
                    src={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFavorite(!isFavorite);
                        toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg hover:scale-110"
                >
                    <Heart
                        className={`w-5 h-5 transition-all ${isFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                            }`}
                    />
                </button>

                {product.category && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-lg">
                        {product.category}
                    </div>
                )}

            </div>

            <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                                }`}
                        />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({rating})</span>
                </div>

                <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product.title}
                </h3>

                {product.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                    </p>
                )}

                <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-110 shadow-md"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
