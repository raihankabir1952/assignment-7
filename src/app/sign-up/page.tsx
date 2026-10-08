"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("পাসওয়ার্ড দুটি একই নয়।");
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.signUp.email({
                name,
                email,
                password,
            });

            if (error) {
                setError(error.message);
                toast.error(error.message);
                return;
            }

            toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

            window.location.href = "/";
        } catch (error) {
            console.error(error);

            setError("সাইন আপ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
            toast.error("সাইন আপ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f3f6f3] flex flex-col items-center justify-center p-4">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    সাইন আপ
                </h1>

                <p className="text-gray-500 text-sm">
                    অ্যাকাউন্ট তৈরি করে বিস্তারিত বাজার দর ও অন্যান্য সুবিধা
                    দেখুন।
                </p>
            </div>

            {/* Sign Up Card */}
            <div className="w-full max-w-md bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-800 mb-1.5"
                        >
                            নাম
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="আপনার নাম"
                            className="w-full px-4 py-2.5 bg-[#f9fafb] border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008a45] focus:bg-white transition-all text-sm"
                        />
                    </div>

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
                            autoComplete="new-password"
                            required
                            minLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full px-4 py-2.5 bg-[#f9fafb] border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008a45] focus:bg-white transition-all text-sm"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-semibold text-gray-800 mb-1.5"
                        >
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            minLength={8}
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="পাসওয়ার্ড আবার লিখুন"
                            className="w-full px-4 py-2.5 bg-[#f9fafb] border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008a45] focus:bg-white transition-all text-sm"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 px-4 bg-[#008a45] hover:bg-[#007339] disabled:bg-gray-400 text-white font-medium rounded-xl shadow-md shadow-green-900/10 transition-all text-sm"
                    >
                        {loading ? "সাইন আপ হচ্ছে..." : "সাইন আপ"}
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

                {/* Sign In */}
                <div className="text-center text-xs text-gray-600">
                    আগে থেকেই অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/sign-in"
                        className="text-[#008a45] hover:underline font-semibold"
                    >
                        সাইন ইন করুন
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

export default SignUpPage;