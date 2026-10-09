export default function Loading() {
    return (
        <main className="min-h-[60vh] bg-[#f7faf7] px-4 py-8">
            <div className="mx-auto max-w-5xl animate-[pulse_2s_ease-in-out_infinite]">
                <div className="mb-10 h-56 rounded-3xl bg-green-100" />

                {[1, 2, 3].map((section) => (
                    <section key={section} className="mb-10">
                        <div className="mb-5 h-6 w-48 rounded bg-gray-200" />

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div
                                    key={item}
                                    className="h-28 rounded-2xl border border-gray-200 bg-white"
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}