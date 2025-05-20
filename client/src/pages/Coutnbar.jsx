import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Properties Listed", value: 1200, icon: "🏠" },
  { label: "Happy Users", value: 850, icon: "😊" },
  { label: "Verified Agents", value: 75, icon: "🧑‍💼" },
  { label: "Properties Sold", value: 500, icon: "💰" },
];

export default function StatsCounter() {
  const [count, setCount] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setCount((prev) =>
          prev.map((c, i) =>
            i === index && c < stat.value
              ? c + Math.ceil(stat.value / 100)
              : c
          )
        );
      }, 20);
    });

    return () => intervals.forEach(clearInterval);
  }, [hasAnimated]);

  return (
    <section ref={ref} className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
           <h1 className="text-center text-black text-4xl font-bold my-10 mt-10">
 data 
</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transform transition hover:scale-105 duration-300"
            >
              <div className="text-4xl mb-4 animate-bounce">{stat.icon}</div>
              <h2 className="text-3xl font-bold text-blue-600">
                {count[index] > stat.value ? stat.value : count[index]}+
              </h2>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
