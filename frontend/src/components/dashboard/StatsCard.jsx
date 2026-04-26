import React from "react";

const colorVariants = {
  orange: {
    bg: "bg-orange-500/10",
    icon: "text-orange-500",
    ring: "group-hover:ring-orange-500/30",
  },
  blue: {
    bg: "bg-blue-500/10",
    icon: "text-blue-500",
    ring: "group-hover:ring-blue-500/30",
  },
  green: {
    bg: "bg-green-500/10",
    icon: "text-green-500",
    ring: "group-hover:ring-green-500/30",
  },
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = "orange",
}) {
  const styles = colorVariants[color] || colorVariants.orange;

  return (
    <div className="group bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
      {/* ICON */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${styles.bg} ${styles.icon} ring-1 ring-gray-200 transition-all duration-300 ${styles.ring}`}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* TEXT */}
      <div className="flex flex-col">
        <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
          {title}
        </p>

        <h2 className="text-2xl font-bold text-[#0B1C3F] leading-tight mt-1">
          {value}
        </h2>
      </div>
    </div>
  );
}
