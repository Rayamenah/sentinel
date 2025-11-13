import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import React, { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { Upload, User, X } from "lucide-react";

export default function CompleteProfileModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
    const { currentUser, updateProfile } = useUserStore((s) => s);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result as string;
            setPreview(result);
            updateProfile({ avatar: result, completedProfile: true });
            setUploading(false);

            setTimeout(() => {
                onOpenChange(false);
            }, 1000);
        };

        reader.onerror = () => {
            setUploading(false);
            alert("Failed to read file");
        };

        reader.readAsDataURL(file);
    };

    const handleSkip = () => {
        updateProfile({ completedProfile: true });
        onOpenChange(false);
    };

    if (!currentUser) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                        Complete Your Profile
                    </DialogTitle>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-lg">
                                {preview || currentUser.avatar ? (
                                    <img
                                        src={preview || currentUser.avatar}
                                        alt="Avatar preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="w-16 h-16 text-blue-600" />
                                )}
                            </div>
                            {uploading && (
                                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                </div>
                            )}
                        </div>

                        <p className="text-sm text-gray-600 text-center">
                            Upload a profile picture to personalize your account
                        </p>
                    </div>

                    <div className="space-y-3">
                        <label
                            htmlFor="avatar-upload"
                            className="block cursor-pointer"
                        >
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-700 mb-1">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 5MB
                                </p>
                            </div>
                        </label>

                        <Input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={onFile}
                            className="hidden"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={handleSkip}
                            className="flex-1 py-6 text-base font-medium"
                        >
                            Skip for Now
                        </Button>
                        <Button
                            onClick={() => document.getElementById('avatar-upload')?.click()}
                            disabled={uploading}
                            className="flex-1 py-6 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {uploading ? "Uploading..." : "Upload Photo"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}