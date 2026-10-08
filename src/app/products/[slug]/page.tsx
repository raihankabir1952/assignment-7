import React, { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Change {
    dir: "up" | "down" | "flat";
    pct: number;
}

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface Product {
    id: string | number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    image: string;
    today: number;
    yesterday: number;
    unit: string;
    change: Change;
    markets: Market[];
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};

const toBn = (n: number) => n.toLocaleString("bn-BD");

// whole numbers stay plain (৬২), halves get two decimals (৬৩.৫০)
const avgBn = (n: number) =>
    Number.isInteger(n)
        ? toBn(n)
        : n.toLocaleString("bn-BD", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          });

const pctBn = (n: number) =>
    Math.abs(n).toLocaleString("bn-BD", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });

const ProductContent = async ({ params }: PageProps) => {
    const { slug } = await params;

    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products"
    );

    const data: Product[] = await res.json();

    const product = data.find((item) => item.slug === slug);

    if (!product) notFound();

    const unit = unitBn[product.unit] ?? product.unit;
    const { dir, pct } = product.change;
    const diff = Math.abs(product.today - product.yesterday);

    const markets = product.markets ?? [];

    // market table, cheapest average first (same order as the screenshot)
    const rows = markets
        .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
        .sort((a, b) => a.avg - b.avg);

    const minPrice = markets.length
        ? Math.min(...markets.map((m) => m.min))
        : 0;
    const maxPrice = markets.length
        ? Math.max(...markets.map((m) => m.max))
        : 0;

    const badgeColor =
        dir === "up"
            ? "text-red-600"
            : dir === "down"
            ? "text-green-600"
            : "text-gray-500";

    const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

    return (
        <section className="w-full bg-[#f4f8f5] py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">

                {/* Breadcrumb */}
                <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                    <Link href="/" className="hover:text-[#008a45]">
                        হোম
                    </Link>
                    <span>›</span>
                    <Link
                        href={`/category/${product.category}`}
                        className="hover:text-[#008a45]"
                    >
                        {product.categoryNameBn}
                    </Link>
                    <span>›</span>
                    <span className="font-medium text-gray-900">
                        {product.nameBn}
                    </span>
                </nav>

                {/* Product header card */}
                <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-4xl">
                            {product.image}
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {product.nameBn}
                            </h1>
                            <p className="text-xs text-gray-500">
                                প্রতি {unit} · {product.categoryNameBn}
                            </p>
                            <p className="mt-1 text-xs text-gray-700">
                                {dir === "flat" ? (
                                    <>
                                        গতকালের তুলনায় আজ দাম{" "}
                                        <strong>অপরিবর্তিত</strong>
                                    </>
                                ) : (
                                    <>
                                        গতকালের তুলনায় আজ দাম{" "}
                                        <strong>
                                            {dir === "up" ? "বেড়েছে" : "কমেছে"}
                                        </strong>{" "}
                                        · {toBn(diff)} টাকা
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gray-100 px-6 py-3 text-center sm:min-w-36">
                        <p className="text-[11px] text-gray-500">আজকের দাম</p>
                        <p className="text-3xl font-extrabold text-gray-900">
                            {toBn(product.today)}
                        </p>
                        <p className="text-[11px] text-gray-500">
                            টাকা / {unit}
                        </p>
                        <p className={`mt-1 text-xs font-semibold ${badgeColor}`}>
                            {arrow} {pctBn(pct)}%
                        </p>
                    </div>
                </div>

                {markets.length > 0 && (
                    <div className="mt-5 rounded-2xl border border-gray-200 bg-white/80 p-5">

                        {/* Summary */}
                        <h2 className="mb-3 text-sm font-bold text-gray-900">
                            দামের সারসংক্ষেপ
                        </h2>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <div className="rounded-xl border border-gray-200 bg-white p-4">
                                <p className="text-[11px] text-gray-500">
                                    সর্বনিম্ন দাম
                                </p>
                                <p className="mt-1">
                                    <span className="text-xl font-bold text-green-600">
                                        {toBn(minPrice)}
                                    </span>{" "}
                                    <span className="text-xs text-green-600">
                                        টাকা
                                    </span>
                                </p>
                                <p className="mt-1 text-[11px] text-gray-500">
                                    সবচেয়ে কম দামের বাজার
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-4">
                                <p className="text-[11px] text-gray-500">
                                    সর্বাধিক দাম
                                </p>
                                <p className="mt-1">
                                    <span className="text-xl font-bold text-red-600">
                                        {toBn(maxPrice)}
                                    </span>{" "}
                                    <span className="text-xs text-red-600">
                                        টাকা
                                    </span>
                                </p>
                                <p className="mt-1 text-[11px] text-gray-500">
                                    সবচেয়ে বেশি দামের বাজার
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-4">
                                <p className="text-[11px] text-gray-500">
                                    গড় দাম
                                </p>
                                <p className="mt-1">
                                    <span className="text-xl font-bold text-[#008a45]">
                                        {toBn(product.today)}
                                    </span>{" "}
                                    <span className="text-xs text-[#008a45]">
                                        টাকা
                                    </span>
                                </p>
                                <p className="mt-1 text-[11px] text-gray-500">
                                    প্রতি {unit}-এর হিসাবে
                                </p>
                            </div>
                        </div>

                        {/* Market table */}
                        <h2 className="mb-3 mt-6 text-sm font-bold text-gray-900">
                            বাজারভিত্তিক আজকের দাম
                        </h2>

                        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                            <table className="w-full min-w-[520px] text-left text-xs">
                                <thead>
                                    <tr className="text-gray-500">
                                        <th className="px-4 py-3 font-normal">
                                            বাজার
                                        </th>
                                        <th className="px-4 py-3 font-normal">
                                            বিভাগ
                                        </th>
                                        <th className="px-4 py-3 text-right font-normal">
                                            সর্বনিম্ন
                                        </th>
                                        <th className="px-4 py-3 text-right font-normal">
                                            সর্বাধিক
                                        </th>
                                        <th className="px-4 py-3 text-right font-normal">
                                            গড়
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {rows.map((m) => (
                                        <tr
                                            key={m.market}
                                            className="border-t border-gray-200 even:bg-gray-50"
                                        >
                                            <td className="px-4 py-3 font-semibold text-gray-900">
                                                {m.market}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {m.division}
                                            </td>
                                            <td className="px-4 py-3 text-right text-gray-600">
                                                {toBn(m.min)} টাকা
                                            </td>
                                            <td className="px-4 py-3 text-right text-gray-600">
                                                {toBn(m.max)} টাকা
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold text-gray-900">
                                                {avgBn(m.avg)} টাকা
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

const ProductPage = ({ params }: PageProps) => {
    return (
        <main>
            <Suspense
                fallback={
                    <section className="w-full bg-[#f4f8f5] py-8">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6">
                            <div className="h-28 rounded-2xl bg-gray-100 animate-pulse" />
                        </div>
                    </section>
                }
            >
                <ProductContent params={params} />
            </Suspense>
        </main>
    );
};

export default ProductPage;