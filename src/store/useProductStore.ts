// useProductStore.ts - FIXED VERSION
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export type Product = {
    id: string;
    title: string;
    price: number;
    description?: string;
    image?: string;
    category?: string;
    owner?: string;
};

type State = {
    products: Product[];
    apiProductsLoaded: boolean;
    setProducts: (p: Product[]) => void;
    addProduct: (p: Omit<Product, "id">) => void;
    loadInitial: (initial: Product[]) => void;
};

export const useProductStore = create<State>()(
    persist(
        (set) => ({
            products: [],
            apiProductsLoaded: false,
            setProducts: (products) => set({ products }),
            addProduct: (p) => set((s) => ({
                products: [{ id: nanoid(), ...p }, ...s.products]
            })),
            loadInitial: (initial) => set((s) => {
                if (s.apiProductsLoaded) {
                    return s;
                }

                const userProducts = s.products.filter(p => p.owner || p.id.length > 10);

                const apiIds = new Set(initial.map(p => p.id));
                const uniqueUserProducts = userProducts.filter(p => !apiIds.has(p.id));

                return {
                    products: [...initial, ...uniqueUserProducts],
                    apiProductsLoaded: true
                };
            })
        }),
        {
            name: "product-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                products: state.products,
                apiProductsLoaded: state.apiProductsLoaded
            })
        }
    )
);