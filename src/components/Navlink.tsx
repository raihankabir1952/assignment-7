import Link from "next/link";
import React from "react";

interface Category {
    id: string | number;
    nameBn: string;
    slug: string;
    icon: string;
}

const Navlink = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/categories",
        {
            next: {
                revalidate: 3600,
            },
        }
    );

    const data: Category[] = await res.json();

    return (
        <div className="w-full flex  mt-5">
            <div className="flex gap-5">
                <Link href="/">
                    🏠 হোম
                </Link>

                {data.map((category) => (
                    <Link
                        href={`/category/${category.slug}`}
                        key={category.id}
                    >
                        {category.icon} {category.nameBn}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Navlink;