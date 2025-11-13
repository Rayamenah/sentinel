import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import { useCartStore } from "../store/useCartStore";
import { toast } from "sonner";

export default function CartModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
    const items = useCartStore((s) => s.items);
    const total = items.reduce((acc, it) => acc + it.price * it.qty, 0);
    const { clear, removeFromCart, updateQty } = useCartStore((s) => s);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-96 bg-white p-4 rounded shadow">
                <DialogTitle className="font-bold">Your Cart</DialogTitle>
                <div className="space-y-4 overflow-auto h-100 ">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            {/* Left section */}
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                    <img
                                        src={item.image || "https://via.placeholder.com/150"}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <button
                                            onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                                            className="px-2 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all"
                                        >
                                            −
                                        </button>
                                        <span className="text-sm font-medium text-gray-900 w-6 text-center">
                                            {item.qty}
                                        </span>
                                        <button
                                            onClick={() => updateQty(item.id, item.qty + 1)}
                                            className="px-2 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Right section */}
                            <div className="text-right flex flex-col items-end gap-2">
                                <p className="text-lg font-semibold text-gray-900">
                                    ${(item.price * item.qty).toFixed(2)}
                                </p>
                                <button
                                    onClick={() => {
                                        removeFromCart(item.id);
                                        toast.success("Item removed from cart");
                                    }}
                                    className="text-sm text-red-500 hover:text-red-600 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="font-bold">Total: ${total.toFixed(2)}</div>
                    <div className="flex gap-2">
                        <button onClick={() => { clear(); onOpenChange(false); toast.success("Checkout success! 🎉"); }} className="px-3 py-1 bg-green-600 text-white rounded">Checkout</button>
                        <DialogClose asChild>
                            <button className="px-3 py-1 border rounded">Close</button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
