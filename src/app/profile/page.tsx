"use client";

import React, { useState } from "react";
import Link from "next/link";

const ProfilePage = () => {
    const [name, setName] = useState("Raihan Kabir");
    const [email] = useState("raihan@example.com");

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);

    const handleUpdateName = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newName.trim()) return;

        setName(newName.trim());
        setIsEditing(false);
    };

    return (
        <main className="min-h-[70vh] w-full bg-[#f4f8f5] py-10">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">

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
                    <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#008a45] text-2xl font-bold text-white">
                            {name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                আমার প্রোফাইল
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                আপনার অ্যাকাউন্টের তথ্য
                            </p>
                        </div>
                    </div>

                    {/* User Information */}
                    <div className="mt-6 space-y-5">

                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                নাম
                            </label>

                            {!isEditing ? (
                                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                                    <span className="text-sm text-gray-900">
                                        {name}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setNewName(name);
                                            setIsEditing(true);
                                        }}
                                        className="text-sm font-semibold text-[#008a45] hover:text-[#007339]"
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
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#008a45] focus:ring-1 focus:ring-[#008a45]"
                                        placeholder="আপনার নাম লিখুন"
                                    />

                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            className="rounded-xl bg-[#008a45] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#007339]"
                                        >
                                            Save
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                ইমেইল
                            </label>

                            <div className="rounded-xl border border-gray-200 bg-gray-100 px-4 py-3">
                                <p className="text-sm text-gray-600">
                                    {email}
                                </p>
                            </div>

                            <p className="mt-2 text-xs text-gray-400">
                                ইমেইল পরিবর্তন করা যাবে না।
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;