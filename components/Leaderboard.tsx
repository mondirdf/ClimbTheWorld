"use client";

type Leader = {
  userId: string;
  username: string;
  country: string;
  bestHeight: number;
};

function countryCodeToEmoji(countryCode: string) {
  if (!countryCode || countryCode.length !== 2) return "🏳️";
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

export function Leaderboard({ leaders }: { leaders: Leader[] | undefined }) {
  return (
    <aside className="fixed left-4 top-4 z-40 w-72 rounded-xl border border-white/20 bg-black/60 p-4 backdrop-blur">
      <h2 className="text-lg font-bold">Global Leaderboard</h2>
      <p className="mb-3 text-xs text-slate-400">Realtime top climbers</p>
      <ol className="space-y-2 text-sm">
        {(leaders ?? []).map((leader, idx) => (
          <li key={leader.userId} className="rounded-md bg-white/5 p-2">
            #{idx + 1} {countryCodeToEmoji(leader.country)} {leader.username} – {leader.bestHeight.toLocaleString()}m
          </li>
        ))}
      </ol>
    </aside>
  );
}
