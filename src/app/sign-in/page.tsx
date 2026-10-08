"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({
            email,
            password,
        });
    };

    return (
        <div className="min-h-screen bg-[#f3f6f3] flex flex-col items-center justify-center p-4">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    সাইন ইন
                </h1>

                <p className="text-gray-500 text-sm">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে
                    ঢুকুন।
                </p>
            </div>

            {/* Sign In Card */}
            <div className="w-full max-w-md bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800 mb-1.5"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 bg-[#f9fafb] border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008a45] focus:bg-white transition-all text-sm"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800 mb-1.5"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            minLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full px-4 py-2.5 bg-[#f9fafb] border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008a45] focus:bg-white transition-all text-sm"
                        />
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full py-2.5 px-4 bg-[#008a45] hover:bg-[#007339] text-white font-medium rounded-xl shadow-md shadow-green-900/10 transition-all text-sm"
                    >
                        সাইন ইন
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6 flex items-center justify-center">
                    <div className="border-t border-gray-200 w-full" />

                    <span className="bg-white px-3 text-xs text-gray-400 font-medium absolute">
                        অথবা
                    </span>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {/* Google */}
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors"
                    >
                        <FcGoogle size={20} />
                        <span>Google</span>
                    </button>

                    {/* GitHub */}
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors"
                    >
                        <FaGithub size={20} />
                        <span>GitHub</span>
                    </button>
                </div>

                {/* Sign Up */}
                <div className="text-center text-xs text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/sign-up"
                        className="text-[#008a45] hover:underline font-semibold"
                    >
                        সাইন আপ করুন
                    </Link>
                </div>
            </div>

            {/* Back to Home */}
            <div className="mt-8 text-center">
                <Link
                    href="/"
                    className="text-gray-500 hover:text-gray-700 text-xs font-medium transition-colors"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
};

export default SignInPage;