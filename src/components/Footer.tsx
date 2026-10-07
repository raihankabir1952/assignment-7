import React from "react";

const Footer = () => {
    return (
        <footer className="w-full border-t border-gray-200 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex flex-col items-center justify-between gap-2 text-center text-xs sm:text-sm text-gray-600 md:flex-row md:text-left">
                <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
                <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
            </div>
        </footer>
    );
};

export default Footer;