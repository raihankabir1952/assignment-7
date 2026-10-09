"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    FiMenu,
    FiX,
    FiHome,
    FiUser,
    FiLogIn,
    FiUserPlus,
    FiLogOut,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

interface Category {
    id: string | number;
    nameBn: string;
    slug: string;
    icon: string;
}

interface MobileMenuProps {
    categories: Category[];
}

const MobileMenu = ({ categories }: MobileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;
    const displayName = user?.name?.trim() || user?.email || "User";
    const initial = displayName.charAt(0).toUpperCase();

    // Close the drawer when the Escape key is pressed.
    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    // Close the drawer after a navigation link is clicked.
    const closeMenu = () => {
        setIsOpen(false);
    };

    // Sign out the current user.
    const handleLogout = async () => {
        try {
            const { error } = await authClient.signOut();

            if (error) {
                console.error("Logout failed:", error);
                return;
            }

            setIsOpen(false);
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <>
            {/* Hamburger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-800 transition hover:bg-gray-50 lg:hidden"
            >
                <FiMenu size={23} />
            </button>

            {/* Mobile Side Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    {/* Background Overlay */}
                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        onClick={closeMenu}
                        className="absolute inset-0 h-full w-full bg-black/40"
                    />

                    {/* Drawer Panel */}
                    <aside
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                        className="absolute inset-y-0 right-0 flex w-[min(85vw,360px)] flex-col bg-white shadow-2xl"
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008a45] text-lg font-bold text-white">
                                    ব
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        বাজার দর
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        আজকের বাজার, এক নজরে
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={closeMenu}
                                aria-label="Close menu"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100"
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        {/* User / Authentication Section */}
                        {!isPending && (
                            <div className="border-b border-gray-100 p-4">
                                {user ? (
                                    <Link
                                        href="/profile"
                                        onClick={closeMenu}
                                        className="flex items-center gap-3 rounded-xl bg-green-50 p-3 transition hover:bg-green-100"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#008a45] text-lg font-bold text-white">
                                            {initial}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate font-semibold text-gray-900">
                                                {displayName}
                                            </p>

                                            <p className="text-sm text-[#008a45]">
                                                View Profile
                                            </p>
                                        </div>

                                        <FiUser className="ml-auto shrink-0 text-[#008a45]" size={19} />
                                    </Link>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                        <Link
                                            href="/sign-in"
                                            onClick={closeMenu}
                                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                        >
                                            <FiLogIn size={16} />
                                            Sign In
                                        </Link>

                                        <Link
                                            href="/sign-up"
                                            onClick={closeMenu}
                                            className="flex items-center justify-center gap-2 rounded-lg bg-[#008a45] px-3 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                                        >
                                            <FiUserPlus size={16} />
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Navigation Links */}
                        <nav className="flex-1 overflow-y-auto p-4">
                            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Navigation
                            </p>

                            <Link
                                href="/"
                                onClick={closeMenu}
                                className="mb-1 flex items-center gap-3 rounded-lg px-3 py-3 font-medium text-gray-700 transition hover:bg-green-50 hover:text-[#008a45]"
                            >
                                <FiHome size={19} />
                                হোম
                            </Link>

                            <div className="my-4 border-t border-gray-100" />

                            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                বাজারের ক্যাটাগরি
                            </p>

                            <div className="space-y-1">
                                {categories.map((category) => (
                                    <Link
                                        href={`/category/${category.slug}`}
                                        key={category.id}
                                        onClick={closeMenu}
                                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 transition hover:bg-green-50 hover:text-[#008a45]"
                                    >
                                        <span className="text-lg">
                                            {category.icon}
                                        </span>

                                        <span>{category.nameBn}</span>
                                    </Link>
                                ))}

                                {categories.length === 0 && (
                                    <p className="px-3 py-3 text-sm text-gray-500">
                                        কোনো ক্যাটাগরি পাওয়া যায়নি।
                                    </p>
                                )}
                            </div>

                            {/* Logged-in User Actions */}
                            {user && (
                                <>
                                    <div className="my-4 border-t border-gray-100" />

                                    <Link
                                        href="/profile"
                                        onClick={closeMenu}
                                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 transition hover:bg-green-50 hover:text-[#008a45]"
                                    >
                                        <FiUser size={19} />
                                        Profile
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-red-600 transition hover:bg-red-50"
                                    >
                                        <FiLogOut size={19} />
                                        Logout
                                    </button>
                                </>
                            )}
                        </nav>

                        {/* Drawer Footer */}
                        <div className="border-t border-gray-100 px-5 py-4 text-center text-xs text-gray-400">
                            © {new Date().getFullYear()} বাজার দর
                        </div>
                    </aside>
                </div>
            )}
        </>
    );
};

export default MobileMenu;
