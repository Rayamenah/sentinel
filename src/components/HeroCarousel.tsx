import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const slides = [
    {
        id: 1,
        title: "Premium Collection 2025",
        subtitle: "Discover quality products at competitive prices",
        img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
        gradient: "from-blue-600 to-indigo-600"
    },
    {
        id: 2,
        title: "Tech & Gadgets",
        subtitle: "Latest technology for your everyday needs",
        img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80",
        gradient: "from-slate-700 to-slate-900"
    },
    {
        id: 3,
        title: "Home Essentials",
        subtitle: "Transform your living space",
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        gradient: "from-indigo-600 to-blue-700"
    }
];

export default function HeroCarousel() {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
        return () => clearInterval(t);
    }, []);

    return (
        <section className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
            <div
                className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${idx * 100}%)` }}
            >
                {slides.map((s) => (
                    <div
                        key={s.id}
                        className="w-full shrink-0 relative"
                    >
                        <img
                            src={s.img}
                            alt={s.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-r ${s.gradient} opacity-80`}></div>
                        <div className="relative h-full flex items-center justify-center text-center px-4">
                            <div className="max-w-3xl">
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                                    {s.title}
                                </h2>
                                <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md">
                                    {s.subtitle}
                                </p>
                                <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:scale-105 transform transition-all shadow-xl hover:shadow-2xl">
                                    Shop Now
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`transition-all duration-300 rounded-full ${i === idx
                            ? "w-12 h-3 bg-white"
                            : "w-3 h-3 bg-white/50 hover:bg-white/75"
                            }`}
                        onClick={() => setIdx(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}