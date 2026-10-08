import React, { Suspense } from "react";
import Link from "next/link";

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ sort?: string }>;
}

interface Change {
    dir: "up" | "down" | "flat";
    pct: number;
}

interface Product {
    id: string | number;
    image: string;
    nameBn: string;
    today: number;
    unit: string;
    change: Change;
    category: string;
    categoryNameBn?: string;
    categoryIcon?: string;
}

const unitBn: Record<string, string> = {
    kg: "কেজি",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
    liter: "লিটার",
    litre: "লিটার",
};

const toBn = (n: number) => n.toLocaleString("bn-BD");

const CategoryContent = async ({ params, searchParams }: PageProps) => {
    const { slug } = await params;
    const { sort } = await searchParams;

    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products"
    );

    const data: Product[] = await res.json();

    const categoryProducts = data.filter(
        (product) => product.category === slug
    );

    // Sorting
    if (sort === "priceAsc") {
        categoryProducts.sort((a, b) => a.today - b.today);
    }

    if (sort === "priceDesc") {
        categoryProducts.sort((a, b) => b.today - a.today);
    }

    if (sort === "change") {
        categoryProducts.sort(
            (a, b) => b.change.pct - a.change.pct
        );
    }

    const firstProduct = categoryProducts[0];

    return (
        <section className="w-full bg-[#f4f8f5] py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">

                {/* Category header */}
                <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white/80 p-5">
                    {firstProduct?.categoryIcon && (
                        <span className="text-4xl leading-none">
                            {firstProduct.categoryIcon}
                        </span>
                    )}

                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            {firstProduct?.categoryNameBn ?? slug}
                        </h1>

                        <p className="text-xs text-gray-500">
                            {toBn(categoryProducts.length)}
                            টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>

                {/* Sort */}
                <div className="mt-4 flex items-center justify-end gap-2 rounded-2xl border border-gray-200 bg-white/80 px-4 py-3">
                    <span className="text-xs text-gray-600">
                        সাজান
                    </span>

                    <details className="relative">
                        <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-800 [&::-webkit-details-marker]:hidden">
                            {sort === "priceAsc"
                                ? "দাম: কম থেকে বেশি"
                                : sort === "priceDesc"
                                ? "দাম: বেশি থেকে কম"
                                : sort === "change"
                                ? "বেশি পরিবর্তন"
                                : "ডিফল্ট"}

                            <span className="text-[10px]">
                                ⌄
                            </span>
                        </summary>

                        <ul className="absolute right-0 z-10 mt-1 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">

                            <li>
                                <Link
                                    href="?"
                                    scroll={false}
                                    className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                                >
                                    ডিফল্ট
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="?sort=priceAsc"
                                    scroll={false}
                                    className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                                >
                                    দাম: কম থেকে বেশি
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="?sort=priceDesc"
                                    scroll={false}
                                    className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                                >
                                    দাম: বেশি থেকে কম
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="?sort=change"
                                    scroll={false}
                                    className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                                >
                                    বেশি পরিবর্তন
                                </Link>
                            </li>

                        </ul>
                    </details>
                </div>

                {/* Count */}
                <p className="mt-4 mb-3 text-xs text-gray-600">
                    মোট{" "}
                    <strong>
                        {toBn(categoryProducts.length)}
                    </strong>{" "}
                    টি পণ্য দেখানো হচ্ছে
                </p>

                {/* Empty */}
                {categoryProducts.length === 0 && (
                    <p className="rounded-2xl border border-gray-200 bg-white/80 p-6 text-center text-sm text-gray-500">
                        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                    </p>
                )}

                {/* Products */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {categoryProducts.map((product) => {

                        let badgeClass =
                            "bg-gray-100 text-gray-600";

                        let arrow = "—";

                        if (product.change.dir === "up") {
                            badgeClass =
                                "bg-red-50 text-red-600";
                            arrow = "▲";
                        }

                        if (product.change.dir === "down") {
                            badgeClass =
                                "bg-green-50 text-green-600";
                            arrow = "▼";
                        }

                        return (
                            <div
                                key={product.id}
                                className="rounded-2xl border border-gray-200 bg-white/80 p-4"
                            >
                                <div className="flex items-center gap-3">

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                                        {product.image}
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="truncate font-bold text-gray-900">
                                            {product.nameBn}
                                        </h3>

                                        <p className="text-xs text-gray-500">
                                            প্রতি{" "}
                                            {unitBn[product.unit] ??
                                                product.unit}
                                        </p>
                                    </div>

                                </div>

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

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
                                        >
                                            {arrow}{" "}
                                            {toBn(product.change.pct)}%
                                        </span>

                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

const CategoryPage = ({
    params,
    searchParams,
}: PageProps) => {
    return (
        <main>
            <Suspense
                fallback={
                    <section className="w-full bg-[#f4f8f5] py-8">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6">
                            <div className="h-20 rounded-2xl bg-gray-100 animate-pulse" />
                        </div>
                    </section>
                }
            >
                <CategoryContent
                    params={params}
                    searchParams={searchParams}
                />
            </Suspense>
        </main>
    );
};

export default CategoryPage;