import { useEffect, useState } from "react";
import api from "../lib/axios";
import { useProductStore } from "../store/useProductStore";

export function useFetchProducts() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const loadInitial = useProductStore((s) => s.loadInitial);
    const apiProductsLoaded = useProductStore((s) => s.apiProductsLoaded);

    useEffect(() => {
        if (apiProductsLoaded) {
            return;
        }

        let cancelled = false;

        const fetcher = async () => {
            setLoading(true);
            try {
                const res = await api.get("/products?limit=12");

                if (cancelled) return;

                console.log(res.data)
                loadInitial(res.data.products.map((p: any) => ({
                    id: String(p.id),
                    title: p.title,
                    price: p.price,
                    description: p.description,
                    image: p.images[0],
                    category: p.category
                })));
            } catch (err: any) {
                if (!cancelled) {
                    setError(err?.message || "Failed to load products");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
                setLoading(false)
            }
        };

        fetcher();

        return () => {
            cancelled = true;
        };
    }, [loadInitial, apiProductsLoaded]);
    return { loading, error };
}