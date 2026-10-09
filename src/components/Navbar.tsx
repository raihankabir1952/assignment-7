import React, { Suspense } from "react";
import Image from "next/image";
import { connection } from "next/server";
import NavLink from "./Navlink";
import Marquee from "./Marquee";
import AuthNav from "./AuthNav";
import MobileMenu from "./MobileMenu";

interface Category {
    id: string | number;
    nameBn: string;
    slug: string;
    icon: string;
}

const CurrentDate = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    });

    return <>{date}</>;
};

const Navbar = async () => {
    let categories: Category[] = [];

    try {
        const res = await fetch(
            "https://api.api-store.workers.dev/api/bazardor/categories",
            { next: { revalidate: 3600 } }
        );

        if (res.ok) {
            categories = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }

    return (
        <header className="relative z-40 w-full bg-white">
            {/* Main Navbar */}
            <div className="border-b border-gray-100">
                <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                    {/* Logo and Date */}
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#008a45] shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl">
                            <Image
                                src="/logo-icon.png"
                                className="h-6 w-6 object-contain brightness-0 invert sm:h-7 sm:w-7"
                                alt="বাজার দর Logo"
                                width={30}
                                height={30}
                                priority
                            />
                        </div>

                        <div className="flex min-w-0 flex-col justify-center">
                            <h1 className="text-lg font-bold leading-tight text-black sm:text-xl">
                                বাজার দর
                            </h1>

                            <small className="mt-1 hidden text-xs font-medium text-gray-500 sm:block">
                                <Suspense
                                    fallback={
                                        <span className="inline-block h-3 w-28 animate-pulse rounded bg-gray-100" />
                                    }
                                >
                                    <CurrentDate />
                                </Suspense>
                            </small>
                        </div>
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden shrink-0 lg:block">
                        <AuthNav />
                    </div>

                    {/* Mobile / Tablet Drawer */}
                    <div className="shrink-0 lg:hidden">
                        <MobileMenu categories={categories} />
                    </div>
                </div>
            </div>

            {/* Desktop Category Navigation */}
            <div className="mx-auto hidden max-w-7xl px-4 sm:px-6 lg:block lg:px-8">
                <NavLink categories={categories} />
            </div>

            {/* Market Price Marquee - unchanged */}
            <div className="w-full overflow-hidden">
                <Marquee />
            </div>
        </header>
    );
};

export default Navbar;