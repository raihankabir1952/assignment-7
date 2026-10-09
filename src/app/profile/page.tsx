"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;
    const name = user?.name ?? "";
    const email = user?.email ?? "";

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

    useEffect(() => {
        setNewName(name);
    }, [name]);

    const handleUpdateName = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const trimmedName = newName.trim();

        if (!trimmedName) {
            toast.error("আপনার নাম লিখুন।");
            return;
        }

        if (trimmedName === name) {
            setIsEditing(false);
            return;
        }

        setIsSaving(true);

        try {
            const { error } = await authClient.updateUser({
                name: trimmedName,
            });

            if (error) {
                toast.error(error.message || "নাম আপডেট করা যায়নি।");
                return;
            }

            await authClient.getSession();

            setIsEditing(false);
            toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে!");
            router.refresh();
        } catch {
            toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSignOut = async () => {
        setIsSigningOut(true);

        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error(error.message || "সাইন আউট করা যায়নি।");
                return;
            }

            toast.success("সফলভাবে সাইন আউট হয়েছে!");
            router.replace("/");
            router.refresh();
        } catch {
            toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
        } finally {
            setIsSigningOut(false);
        }
    };

    if (isPending) {
        return (
            <main className="min-h-[70vh] bg-[#f4f8f5] px-4 py-10">
                <div className="mx-auto max-w-2xl animate-pulse rounded-2xl bg-white p-6 shadow-sm">
                    <div className="h-6 w-40 rounded bg-gray-200" />
                    <div className="mt-6 h-16 rounded-xl bg-gray-100" />
                    <div className="mt-4 h-16 rounded-xl bg-gray-100" />
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-[#f4f8f5] px-4 py-10">
                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-[#008a45]">
                        <span className="text-2xl">🔒</span>
                    </div>

                    <h1 className="mt-4 text-xl font-bold text-gray-900">
                        লগ ইন করা প্রয়োজন
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        আপনার প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
                    </p>

                    <Link
                        href="/sign-in"
                        className="mt-6 inline-block rounded-xl bg-[#008a45] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#007339]"
                    >
                        সাইন ইন করুন
                    </Link>

                    <div>
                        <Link
                            href="/"
                            className="mt-4 inline-block text-sm text-gray-500 hover:text-[#008a45]"
                        >
                            ← হোমে ফিরে যান
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const initial = name.trim().charAt(0).toUpperCase() || "U";

    return (
        <main className="min-h-[70vh] w-full bg-[#f4f8f5] py-10">
            <div className="mx-auto max-w-2xl px-4 sm:px-6">
                {/* Back */}
                <Link
                    href="/"
                    className="text-sm text-gray-600 hover:text-[#008a45]"
                >
                    ← হোমে ফিরে যান
                </Link>

                {/* Profile Card */}
                <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-5">
                        <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#008a45] text-2xl font-bold text-white">
                                {initial}
                            </div>

                            <div className="min-w-0">
                                <h1 className="text-xl font-bold text-gray-900">
                                    আমার প্রোফাইল
                                </h1>

                                <p className="mt-1 break-all text-xs text-gray-500 sm:text-sm">
                                    {email}
                                </p>
                            </div>
                        </div>

                        {/* Sign Out Button */}
                        <button
                            type="button"
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="flex shrink-0 items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
                        >
                            <FiLogOut size={17} />
                            <span className="hidden sm:inline">
                                {isSigningOut ? "Signing out..." : "সাইন আউট"}
                            </span>
                            <span className="sm:hidden">
                                {isSigningOut ? "..." : "বের হন"}
                            </span>
                        </button>
                    </div>

                    {/* User Information */}
                    <div className="mt-6 space-y-5">
                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                নাম
                            </label>

                            {!isEditing ? (
                                <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                                    <span className="break-words text-sm text-gray-900">
                                        {name || "নাম দেওয়া নেই"}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setNewName(name);
                                            setIsEditing(true);
                                        }}
                                        className="shrink-0 text-sm font-semibold text-[#008a45] hover:text-[#007339]"
                                    >
                                        Edit
                                    </button>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleUpdateName}
                                    className="space-y-3"
                                >
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) =>
                                            setNewName(e.target.value)
                                        }
                                        maxLength={100}
                                        autoFocus
                                        disabled={isSaving}
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#008a45] focus:ring-1 focus:ring-[#008a45] disabled:opacity-60"
                                        placeholder="আপনার নাম লিখুন"
                                    />

                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={
                                                isSaving || !newName.trim()
                                            }
                                            className="rounded-xl bg-[#008a45] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#007339] disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {isSaving ? "Saving..." : "Save"}
                                        </button>

                                        <button
                                            type="button"
                                            disabled={isSaving}
                                            onClick={() => {
                                                setNewName(name);
                                                setIsEditing(false);
                                            }}
                                            className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
