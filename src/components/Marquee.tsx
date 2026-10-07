import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Change {
    dir: "up" | "down";
    pct: number;
}

interface Product {
    id: string | number;
    nameBn: string;
    today: number;
    unit: string;
    categoryIcon: string;
    image: string;
    change: Change;
}

const Marquee = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products",
        {
            next: {
                revalidate: 3600,
            },
        }
    );

    const data: Product[] = await res.json();

    return (
        <div className="w-full bg-white text-black overflow-hidden">
            <MarqueeText
                direction="right"
                duration={10}
                className="py-2"
            >
                {data.map((product) => (
                    <span key={product.id}>
                        <span>
                            {product.image}
                            {product.nameBn}{" "}
                            {product.today} টাকা/
                            {product.unit === "kg"
                                ? "কেজি"
                                : product.unit}{" "}

                            <span
                                className={
                                    product.change.dir === "up"
                                        ? "text-red-500 font-bold"
                                        : "text-green-500 font-bold"
                                }
                            >
                                {product.change.dir === "up"
                                    ? "▲"
                                    : "▼"}{" "}
                                {product.change.pct}%
                            </span>
                        </span>

                        <span className="mx-5">•</span>
                    </span>
                ))}
            </MarqueeText>
        </div>
    );
};

export default Marquee;