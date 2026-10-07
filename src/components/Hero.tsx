import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

const HeroDate = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    });

    return <>{date}</>;
};

const Hero = () => {
    return (
        <section className="w-full bg-[#f4f8f5] py-8 sm:py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="relative flex flex-col-reverse md:flex-row items-center justify-between gap-6 rounded-3xl border border-gray-200 bg-white/70 px-6 py-8 sm:px-10 sm:py-10">

                    {/* Left: text */}
                    <div className="flex-1 text-center md:text-left">
                        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-[#008a45]">
                            <Suspense
                                fallback={
                                    <span className="inline-block h-3 w-28 rounded bg-green-200 animate-pulse align-middle" />
                                }
                            >
                                <HeroDate />
                            </Suspense>
                        </span>

                        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                            আজকের বাজারের দাম এক নজরে
                        </h2>

                        <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-gray-500 mx-auto md:mx-0">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                            দামের পরিবর্তন এক জায়গায়।
                        </p>

                        <Link
                            href="/products"
                            className="mt-6 inline-block rounded-xl bg-[#008a45] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/20 transition-all hover:bg-[#007339]"
                        >
                            সব পণ্য দেখুন
                        </Link>
                    </div>

                    {/* Right: image */}
                    <div className="shrink-0">
                        <Image
                            src="/bazar-hero.png"
                            alt="বাজারের সবজি ও ফলের ঝুড়ি"
                            width={320}
                            height={260}
                            className="h-auto w-56 sm:w-72 md:w-80 object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;