"use client";
import { useEffect, useState } from "react";
import AddProductModal from "../components/AddProductModal";
import CartModal from "../components/CartModal";
import CompleteProfileModal from "../components/Completeprofile";
import HeroCarousel from "../components/HeroCarousel";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import { useFetchProducts } from "../hooks/useFetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "../store/useUserStore";

export default function HomePage() {
  const { loading, error } = useFetchProducts();
  const [profileOpen, setProfileOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { currentUser } = useUserStore((s) => s);
  const router = useRouter()
  useEffect(() => {
    if (!currentUser) {
      toast.error("sign in to proceed")
      router.push("/auth/login")
    }
  }, [currentUser, router])

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar
        onOpenProfile={() => setProfileOpen(true)}
        onOpenAddProduct={() => setAddProductOpen(true)}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroCarousel />

        <div className="mt-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-600">Discover our curated collection of quality items</p>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <ProductGrid />
        </div>
      </main>

      <CompleteProfileModal open={profileOpen} onOpenChange={setProfileOpen} />
      <AddProductModal open={addProductOpen} onOpenChange={setAddProductOpen} />
      <CartModal open={cartOpen} onOpenChange={setCartOpen} />

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}