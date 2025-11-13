import { ShoppingCart, User, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import Image from "next/image"
import { useUserStore } from "../store/useUserStore";
interface NavbarProps {
    onOpenProfile: () => void;
    onOpenAddProduct: () => void;
    onOpenCart: () => void;
}

export default function Navbar({ onOpenProfile, onOpenAddProduct, onOpenCart }: NavbarProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const cartItems = useCartStore((s) => s.items);
    const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
    const { currentUser } = useUserStore((s) => s);

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-8">
                        <div className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Sentinel
                        </div>
                        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
                            <a href="#" className="hover:text-blue-600 transition-colors">New Arrivals</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Categories</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Deals</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 transition-all text-sm"
                            />
                        </div>

                        <button
                            onClick={(onOpenAddProduct)}
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Add Product
                        </button>

                        <button
                            onClick={onOpenProfile}
                            className="p-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg transition-all"
                            aria-label="Profile"
                        >
                            {!currentUser ? (
                                <User className="w-5 h-5 text-gray-700" />
                            ) : currentUser.avatar ? (
                                <div className="relative rounded-full border size-10">
                                    <Image
                                        className="rounded-full"
                                        fill
                                        src={currentUser.avatar}
                                        alt={currentUser.name || "User avatar"}
                                    />
                                </div>
                            ) : (
                                <User className="w-5 h-5 text-gray-700" />
                            )}
                            {currentUser?.name}
                        </button>

                        <button
                            onClick={onOpenCart}
                            className="relative p-2 hover:bg-gray-100 rounded-lg transition-all"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingCart className="w-5 h-5 text-gray-700" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
