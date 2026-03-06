"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ConvexProvider, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { convex } from "@/lib/convexClient";
import { Flag } from "./Flag";
import { Leaderboard } from "./Leaderboard";
import { SidebarFun } from "./SidebarFun";
import type { Id } from "@/convex/_generated/dataModel";

const MOUNTAIN_HEIGHT_PX = 10_000_000;
const milestones = [
  { height: 324, text: "You reached the height of the Eiffel Tower" },
  { height: 828, text: "You reached the height of Burj Khalifa" },
  { height: 8848, text: "You reached the height of Mount Everest" },
  { height: 10000, text: "You reached typical airplane altitude" },
  { height: 100000, text: "You reached the edge of space" },
];

function countryCodeToEmoji(countryCode: string) {
  if (!countryCode || countryCode.length !== 2) return "🏳️";
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

function ClimbExperience() {
  const [height, setHeight] = useState(0);
  const [username, setUsername] = useState("GuestClimber");
  const [country, setCountry] = useState("US");
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [milestonePopup, setMilestonePopup] = useState<string | null>(null);
  const [crateMessage, setCrateMessage] = useState<string | null>(null);
  const [specialFlagColor, setSpecialFlagColor] = useState<string | undefined>(undefined);
  const seenMilestones = useRef<Set<number>>(new Set());

  const flags = useQuery(api.flags.getFlags);
  const leaderboard = useQuery(api.flags.getLeaderboard);
  const createUser = useMutation(api.users.createUser);
  const placeFlag = useMutation(api.flags.placeFlag);

  useEffect(() => {
    const savedName = localStorage.getItem("internet_mountain_username");
    if (savedName) {
      setUsername(savedName);
    } else {
      const random = `Climber${Math.floor(Math.random() * 9000 + 1000)}`;
      localStorage.setItem("internet_mountain_username", random);
      setUsername(random);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setHeight(Math.max(0, Math.floor(window.scrollY)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => {
        if (data?.country_code) {
          setCountry(data.country_code);
        }
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!username) return;
    void createUser({ username, country }).then((id) => setUserId(id));
  }, [username, country, createUser]);

  useEffect(() => {
    for (const milestone of milestones) {
      if (height >= milestone.height && !seenMilestones.current.has(milestone.height)) {
        seenMilestones.current.add(milestone.height);
        setMilestonePopup(milestone.text);
        setTimeout(() => setMilestonePopup(null), 3500);
      }
    }

    if (Math.random() < 0.0015) {
      const rewards = [
        { text: "You found a crate: +500m boost", boost: 500 },
        { text: "You found a crate: +1000m teleport", boost: 1000 },
        { text: "You found a crate: mythical purple flag unlocked", boost: 0, color: "#a855f7" },
      ];
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      setCrateMessage(reward.text);
      setTimeout(() => setCrateMessage(null), 2500);
      if (reward.boost) {
        window.scrollTo({ top: window.scrollY + reward.boost, behavior: "smooth" });
      }
      if (reward.color) {
        setSpecialFlagColor(reward.color);
      }
    }
  }, [height]);

  const playerRankInfo = useMemo(() => {
    if (!leaderboard?.length) return null;
    const myBest = leaderboard.find((entry) => entry.username === username);
    const sorted = leaderboard;

    if (!myBest) {
      const closestAhead = sorted.find((entry) => entry.bestHeight > height);
      if (closestAhead) {
        return `You are ${Math.max(0, closestAhead.bestHeight - height).toLocaleString()}m below ${closestAhead.username}`;
      }
      return "Plant a flag to join the leaderboard";
    }

    const myIndex = sorted.findIndex((entry) => entry.username === username);
    if (myIndex > 0) {
      const ahead = sorted[myIndex - 1];
      return `You are ${Math.max(0, ahead.bestHeight - myBest.bestHeight).toLocaleString()}m below ${ahead.username}`;
    }

    return "You are currently leading the mountain";
  }, [leaderboard, username, height]);

  useEffect(() => {
    if (!leaderboard?.length) return;
    const passed = leaderboard.find((entry) => entry.bestHeight < height && entry.username !== username);
    if (passed) {
      setNotification(`You passed ${passed.username}`);
      const t = setTimeout(() => setNotification(null), 2500);
      return () => clearTimeout(t);
    }
  }, [height, leaderboard, username]);

  const onPlaceFlag = async () => {
    if (!userId) return;
    await placeFlag({ userId, height, color: specialFlagColor });
    setNotification(`Flag planted at ${height.toLocaleString()}m`);
    setTimeout(() => setNotification(null), 2200);
  };

  return (
    <main className="relative mountain-bg">
      <Leaderboard leaders={leaderboard} />
      <SidebarFun />

      <section className="fixed left-1/2 top-4 z-40 w-[min(90vw,540px)] -translate-x-1/2 rounded-xl border border-white/20 bg-black/65 p-4 text-center backdrop-blur">
        <h1 className="text-2xl font-black tracking-wide">🏔️ Internet Mountain</h1>
        <p className="text-sm text-slate-300">{countryCodeToEmoji(country)} {username}, you are at <span className="font-bold text-cyan-300">{height.toLocaleString()} meters</span></p>
        <p className="mt-2 text-xs text-slate-400">Some say the summit exists. No one has reached it yet.</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <button onClick={onPlaceFlag} className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-black hover:bg-cyan-400">
            Place Flag
          </button>
        </div>
      </section>

      {(notification || milestonePopup || crateMessage || playerRankInfo) && (
        <div className="fixed bottom-4 left-1/2 z-40 w-[min(90vw,520px)] -translate-x-1/2 space-y-2">
          {[notification, milestonePopup, crateMessage, playerRankInfo]
            .filter(Boolean)
            .map((msg) => (
              <div key={msg} className="rounded-md border border-cyan-300/30 bg-black/75 p-2 text-center text-sm text-cyan-100">
                {msg}
              </div>
            ))}
        </div>
      )}

      <section className="relative mx-auto w-full max-w-5xl px-8" style={{ height: `${MOUNTAIN_HEIGHT_PX}px` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/0 via-slate-500/10 to-slate-100/20" />

        {(flags ?? []).map((flag, idx) => (
          <Flag
            key={flag._id}
            username={flag.username}
            country={flag.country}
            height={flag.height}
            createdAt={flag.createdAt}
            color={flag.color}
            left={`${(idx % 4) * 22 + 6}%`}
            bottom={flag.height}
          />
        ))}
      </section>
    </main>
  );
}

export function ClimbUI() {
  return (
    <ConvexProvider client={convex}>
      <ClimbExperience />
    </ConvexProvider>
  );
}
