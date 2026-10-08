import React from "react";
import { cacheLife } from "next/cache";
import Link from "next/link";

interface Change {
    dir: "up" | "down";
    pct: number;
}

interface Product {
    id: string | number;
    slug: string;
    image: string;
    nameBn: string;
    today: number;
    unit: string;
    change: Change;
}

const toBn = (n: number) => n.toLocaleString("bn-BD");

const unitBn: Record<string, string> = {
    kg: "কেজি",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
    liter: "লিটার",
    litre: "লিটার",
};

const TodayPriceUp = async () => {
    "use cache";
    cacheLife("hours");

    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products"
    );

    const data: Product[] = await res.json();

    const priceUpProducts = data
        .filter((product) => product.change.dir === "up")
        .slice(0, 6);

    return (
        <section className="w-full bg-[#f4f8f5] py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">

                <div className="flex items-center gap-2 mb-5">
                    <span className="text-red-600 text-sm">▲</span>

                    <p className="font-bold text-gray-900">
                        আজ দাম বেড়েছে
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {priceUpProducts.map((product) => (
                        <Link
                            href={`/products/${product.slug}`}
                            key={product.id}
                            className="rounded-2xl border border-gray-200 bg-white/80 p-4 hover:border-[#008a45] hover:shadow-sm transition-all"
                        >
                            {/* Top: emoji + name + unit */}
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                                    {product.image}
                                </div>

                                <div className="min-w-0">
                                    <h5 className="truncate font-bold text-gray-900">
                                        {product.nameBn}
                                    </h5>

                                    <p className="text-xs text-gray-500">
                                        প্রতি{" "}
                                        {unitBn[product.unit] ??
                                            product.unit}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom: price + change badge */}
                            <div className="mt-4">
                                <p className="text-xs text-gray-700">
                                    আজকের দাম
                                </p>

                                <div className="mt-1 flex items-center justify-between">
                                    <p className="text-gray-900">
                                        <span className="text-lg font-bold">
                                            {toBn(product.today)}
                                        </span>{" "}
                                        <span className="text-sm">
                                            টাকা
                                        </span>
                                    </p>

                                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                                        ▲ {toBn(product.change.pct)}%
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TodayPriceUp;