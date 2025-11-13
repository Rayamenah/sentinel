import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "./useProductStore";

type CartItem = Product & { qty: number };

type CartState = {
    items: CartItem[];
    addToCart: (p: Product, qty?: number) => void;
    removeFromCart: (id: string) => void;
    updateQty: (id: string, qty: number) => void;
    clear: () => void;
    count: () => number;
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addToCart: (p, qty = 1) =>
                set((s) => {
                    const exists = s.items.find((it) => it.id === p.id);
                    if (exists) {
                        return { items: s.items.map((it) => (it.id === p.id ? { ...it, qty: it.qty + qty } : it)) };
                    }
                    return { items: [{ ...p, qty }, ...s.items] };
                }),
            removeFromCart: (id) => set((s) => ({ items: s.items.filter((it) => it.id !== id) })),
            updateQty: (id, qty) => set((s) => ({ items: s.items.map((it) => (it.id === id ? { ...it, qty } : it)) })),
            clear: () => set({ items: [] }),
            count: () => get().items.reduce((acc, it) => acc + it.qty, 0)
        }),
        { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
    )
);
