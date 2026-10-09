import React, { Suspense } from "react";
import Image from "next/image";
import { connection } from "next/server";
import NavLink from "./Navlink";
import Marquee from "./Marquee";
import AuthNav from "./AuthNav";

// Dynamic date for Bangladesh
const CurrentDate = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    });

    return <>{date}</>;
};

const Navbar = () => {
    return (
        <header className="w-full bg-white border-b border-gray-100">
            {/* Top Navbar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
                {/* Logo + title + date */}
                <div className="flex items-center gap-3 select-none shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-[#008a45] shadow-sm">
                        <Image
                            src="/logo-icon.png"
                            className="h-7 w-7 object-contain brightness-0 invert"
                            alt="Logo"
                            width={30}
                            height={30}
                            priority
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <h1 className="text-xl font-bold text-black leading-tight">
                            বাজার দর
                        </h1>

                        <small className="text-gray-500 text-xs font-medium mt-0.5">
                            <Suspense
                                fallback={
                                    <span className="inline-block h-3 w-32 rounded bg-gray-100 animate-pulse" />
                                }
                            >
                                <CurrentDate />
                            </Suspense>
                        </small>
                    </div>
                </div>

                {/* Authentication / User Profile */}
                <AuthNav />
            </div>

            {/* Navigation Links */}
            <div className="max-w-7xl mx-auto px-4">
                <NavLink />
            </div>

            {/* Market Price Marquee */}
            <Marquee />
        </header>
    );
};

export default Navbar;