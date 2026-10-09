"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const AuthNav = () => {
    const { data: session, isPending, error } = authClient.useSession();
    const router = useRouter();

    const user = session?.user;
    const name = user?.name?.trim() || user?.email || "User";
    const initial = name.charAt(0).toUpperCase();

    useEffect(() => {
        console.log("AuthNav Debug:", {
            isPending,
            hasSession: Boolean(session),
            hasUser: Boolean(user),
            userName: user?.name,
            userEmail: user?.email,
            error,
        });
    }, [isPending, session, user, error]);

    const handleLogout = async () => {
        try {
            const result = await authClient.signOut();

            if (result.error) {
                console.error("Logout failed:", result.error);
                return;
            }

            await authClient.getSession();
            router.refresh();
            router.push("/");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    if (isPending) {
        return (
            <div
                className="h-10 w-36 animate-pulse rounded-xl bg-gray-100"
                aria-label="Loading user"
            />
        );
    }

    if (!user) {
        return (
            <div className="flex items-center gap-4">
                <Link
                    href="/sign-in"
                    className="px-3 py-2 text-sm font-semibold text-gray-800 transition-colors hover:text-black"
                >
                    সাইন ইন
                </Link>

                <Link
                    href="/sign-up"
                    className="rounded-xl bg-[#008a45] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-900/10 transition-all hover:bg-[#007339]"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <Link
                href="/profile"
                title="প্রোফাইল দেখুন"
                aria-label={`${name} - প্রোফাইল দেখুন`}
                className="flex max-w-60 items-center gap-2 rounded-xl p-2 transition-colors hover:bg-green-50"
            >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#008a45] text-lg font-bold text-white">
                    {initial}
                </span>

                <span className="max-w-40 truncate text-sm font-semibold text-gray-800">
                    {name}
                </span>
            </Link>

            <button
                type="button"
                onClick={handleLogout}
                className="shrink-0 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
                লগ আউট
            </button>
        </div>
    );
};

export default AuthNav;