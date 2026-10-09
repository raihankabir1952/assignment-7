
import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
    return (
        <main className="min-h-[75vh] bg-[#f7faf7] px-4 py-12 flex items-center justify-center">
            <div className="w-full max-w-xl mx-auto text-center">

                {/* Error Illustration */}
                <div className="relative w-full max-w-sm h-56 sm:h-64 mx-auto mb-6">
                    <Image
                        src="/not-found.png"
                        alt="পৃষ্ঠা খুঁজে পাওয়া যায়নি"
                        fill
                        priority
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, 384px"
                    />
                </div>

                {/* Error Code */}
                <p className="text-7xl sm:text-8xl font-extrabold text-[#008a45] tracking-tight">
                    ৪০৪
                </p>

                {/* Heading */}
                <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">
                    পৃষ্ঠা খুঁজে পাওয়া যায়নি!
                </h1>

                {/* Description */}
                <p className="mt-4 max-w-md mx-auto text-sm sm:text-base leading-7 text-gray-600">
                    দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন, সেটি খুঁজে পাওয়া যায়নি।
                    হয়তো লিংকটি ভুল অথবা পৃষ্ঠাটি সরিয়ে ফেলা হয়েছে।
                </p>

                {/* Back Home Button */}
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 mt-8 rounded-xl bg-[#008a45] px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#006f37] focus:outline-none focus:ring-2 focus:ring-[#008a45] focus:ring-offset-2"
                >
                    <span aria-hidden="true">⌂</span>
                    হোম পেজে ফিরে যান
                </Link>

                {/* Footer Text */}
                <p className="mt-8 text-xs sm:text-sm text-gray-500">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>
            </div>
        </main>
    );
};

export default NotFound;
