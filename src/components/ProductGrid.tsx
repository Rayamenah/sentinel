import dynamic from "next/dynamic";
import { useProductStore } from "../store/useProductStore";
import { Button } from "./ui/button";

const ProductCard = dynamic(() => import("./ProductCard"), {
    ssr: false,
    loading: () => (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
    )
});

export default function ProductGrid() {
    const products = useProductStore((s) => s.products);

    return (
        <section id="products" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((p, i) => (
                    <div
                        key={p.id}
                        style={{
                            animation: `fadeInUp 0.5s ease-out ${i * 0.05}s both`
                        }}
                    >
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>

            {products.length > 0 && (
                <div className="flex justify-center pt-4">
                    <Button
                        variant="outline"
                        className="px-8 py-6 text-base font-semibold hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition-all"
                    >
                        Load More Products
                    </Button>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}
