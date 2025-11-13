import { Button } from "@/src/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Package } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { productSchema } from "../lib/schema";
import { useProductStore } from "../store/useProductStore";
import { useUserStore } from "../store/useUserStore";

export default function AddProductModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
    const addProduct = useProductStore((s) => s.addProduct);
    const currentUser = useUserStore((s) => s.currentUser);

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: "",
            price: 0,
            description: "",
            image: "",
            category: ""
        },
    });

    const onSubmit = (data: z.infer<typeof productSchema>) => {
        addProduct({ ...data, owner: currentUser?.id });
        toast.success("Product added successfully!");
        form.reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-2xl">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Package className="w-6 h-6 text-blue-600" />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-gray-900">
                                Add New Product
                            </DialogTitle>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
                    <FieldGroup className="space-y-4">
                        <Field>
                            <FieldLabel htmlFor="title" className="text-sm font-medium text-gray-700">
                                Product Title *
                            </FieldLabel>
                            <Input
                                id="title"
                                type="text"
                                placeholder="e.g. Wireless Headphones"
                                {...form.register("title")}
                                className="mt-1"
                                required
                            />
                            {form.formState.errors.title && (
                                <p className="text-sm text-red-600 mt-1">
                                    {form.formState.errors.title.message}
                                </p>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="price" className="text-sm font-medium text-gray-700">
                                Price (USD) *
                            </FieldLabel>
                            <Input
                                id="price"
                                type="number"
                                placeholder="0.00"
                                step="0.01"
                                {...form.register("price", { valueAsNumber: true })}
                                className="mt-1"
                                required
                            />
                            {form.formState.errors.price && (
                                <p className="text-sm text-red-600 mt-1">
                                    {form.formState.errors.price.message}
                                </p>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="category" className="text-sm font-medium text-gray-700">
                                Category *
                            </FieldLabel>
                            <Input
                                id="category"
                                type="text"
                                placeholder="e.g. Electronics, Fashion, Home"
                                {...form.register("category")}
                                className="mt-1"
                                required
                            />
                            {form.formState.errors.category && (
                                <p className="text-sm text-red-600 mt-1">
                                    {form.formState.errors.category.message}
                                </p>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="image" className="text-sm font-medium text-gray-700">
                                Image URL
                            </FieldLabel>
                            <Input
                                id="image"
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                {...form.register("image")}
                                className="mt-1"
                            />
                            {form.formState.errors.image && (
                                <p className="text-sm text-red-600 mt-1">
                                    {form.formState.errors.image.message}
                                </p>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="description" className="text-sm font-medium text-gray-700">
                                Description
                            </FieldLabel>
                            <textarea
                                id="description"
                                placeholder="Describe your product..."
                                {...form.register("description")}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                rows={3}
                            />
                            {form.formState.errors.description && (
                                <p className="text-sm text-red-600 mt-1">
                                    {form.formState.errors.description.message}
                                </p>
                            )}
                        </Field>

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="flex-1 py-6 text-base font-medium"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 py-6 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Add Product
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}