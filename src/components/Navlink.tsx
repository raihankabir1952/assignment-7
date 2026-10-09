import Link from "next/link";
import React from "react";

interface Category {
    id: string | number;
    nameBn: string;
    slug: string;
    icon: string;
}

interface NavlinkProps {
    categories: Category[];
}

const Navlink = ({ categories }: NavlinkProps) => {
    return (
        <nav
            aria-label="Main navigation"
            className="border-b border-gray-100 py-3"
        >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-gray-700">
                <Link
                    href="/"
                    className="shrink-0 transition-colors hover:text-[#008a45]"
                >
                    🏠 হোম
                </Link>

                {categories.map((category) => (
                    <Link
                        href={`/category/${category.slug}`}
                        key={category.id}
                        className="shrink-0 transition-colors hover:text-[#008a45]"
                    >
                        {category.icon} {category.nameBn}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navlink;