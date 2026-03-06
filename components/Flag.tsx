"use client";

import { useState } from "react";

type FlagProps = {
  username: string;
  country: string;
  height: number;
  createdAt: number;
  color?: string;
  left: string;
  bottom: number;
};

function countryCodeToEmoji(countryCode: string) {
  if (!countryCode || countryCode.length !== 2) return "🏳️";
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

export function Flag({ username, country, height, createdAt, color, left, bottom }: FlagProps) {
  const [open, setOpen] = useState(false);
  const emoji = countryCodeToEmoji(country);

  return (
    <div className="absolute" style={{ left, bottom }}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="group relative flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/90 px-3 py-1 text-xs shadow-glow"
      >
        <span className="text-base" style={{ color: color ?? "#f43f5e" }}>
          ⚑
        </span>
        <span className="font-semibold text-slate-100">{username}</span>
        <span>{emoji}</span>
        <span className="text-slate-300">{height.toLocaleString()}m</span>
      </button>

      {open && (
        <div className="mt-2 w-56 rounded-lg border border-white/20 bg-black/90 p-3 text-xs text-slate-200">
          <p className="font-semibold">{username}</p>
          <p>Country: {emoji} {country.toUpperCase()}</p>
          <p>Height: {height.toLocaleString()}m</p>
          <p>Placed: {new Date(createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
