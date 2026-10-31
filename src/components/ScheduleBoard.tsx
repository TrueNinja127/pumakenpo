"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { ArrowUpRight, CalendarDays, Clock, LayoutGrid, List } from "lucide-react";
import { days, hours, timetable, type Day } from "@/lib/schedule";

const ease = [0.16, 1, 0.3, 1] as const;

const fmt = (h: number) => `${String(h > 12 ? h - 12 : h).padStart(2, "0")}:00 ${h >= 12 ? "PM" : "AM"}`;

const color = (name: string) =>
  name.includes("Kenpo") ? "bg-puma/90 text-white" : name.includes("Hapkido") ? "bg-bone text-ink" : name.includes("Silat") ? "bg-amber-500/90 text-ink" : name.includes("Ninja") ? "bg-sky-400/90 text-ink" : "bg-white/10 text-bone";

/** Day-tab list view plus a full weekly grid, transcribed from the official timetable. */
export default function ScheduleBoard({ showGridToggle = true }: { showGridToggle?: boolean }) {
  const [day, setDay] = useState<Day>("Monday");
  const [view, setView] = useState<"list" | "grid">("list");

  useEffect(() => {
    // Open on today, or the next day that has classes.
    const today = (new Date().getDay() + 6) % 7; // Monday = 0
    for (let i = 0; i < 7; i++) {
      const d = days[(today + i) % 7];
      if (timetable[d].length) return setDay(d);
    }
  }, []);

  const sessions = timetable[day];

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <LayoutGroup id="days">
          <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1" role="tablist" aria-label="Day of week" data-lenis-prevent>
            {days.map((d) => (
              <button
                key={d}
                role="tab"
                aria-selected={day === d}
                onClick={() => {
                  setDay(d);
                  setView("list");
                }}
                className={clsx(
                  "relative shrink-0 rounded-xl px-4 py-3 font-display text-xl uppercase tracking-wider transition-colors md:px-5",
                  day === d && view === "list" ? "text-white" : "text-mute hover:text-bone",
                )}
              >
                {day === d && view === "list" && <motion.span layoutId="day-pill" className="absolute inset-0 rounded-xl bg-puma" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative">
                  <span className="md:hidden">{d.slice(0, 3)}</span>
                  <span className="hidden md:inline">{d}</span>
                </span>
              </button>
            ))}
          </div>
        </LayoutGroup>
        {showGridToggle && (
          <div className="flex gap-1 self-start rounded-xl border border-line p-1">
            {(["list", "grid"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={clsx("flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors", view === v ? "bg-white/10 text-bone" : "text-mute hover:text-bone")}
              >
                {v === "list" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                {v === "list" ? "Day" : "Week"}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {view === "list" ? (
            <motion.div key={day} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
              {sessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-dashed border-line py-20 text-center">
                  <CalendarDays className="h-10 w-10 text-puma" />
                  <p className="font-display text-3xl uppercase">No classes on {day}</p>
                  <p className="text-mute">Check another day or contact us about private lessons.</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-[1.5rem] border border-line">
                  <div className="hidden grid-cols-12 border-b border-line bg-white/[0.03] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-mute md:grid">
                    <span className="col-span-3">Time</span>
                    <span className="col-span-5">Class</span>
                    <span className="col-span-2">Day</span>
                    <span className="col-span-2 text-right">Details</span>
                  </div>
                  {sessions.map((s, i) => (
                    <motion.div
                      key={`${s.time}-${s.name}`}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                      className="group relative grid grid-cols-12 items-center gap-y-2 border-b border-line px-6 py-5 last:border-b-0"
                    >
                      <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-puma/15 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                      <span className="relative col-span-6 flex items-center gap-3 font-display text-2xl tracking-wider md:col-span-3">
                        <Clock className="h-4 w-4 text-puma" />
                        {s.time}
                      </span>
                      <span className="relative col-span-6 font-display text-2xl uppercase tracking-wide md:col-span-5 md:text-3xl">{s.name}</span>
                      <span className="relative col-span-6 text-mute md:col-span-2">{day}</span>
                      <span className="relative col-span-6 text-right md:col-span-2">
                        {s.slug ? (
                          <Link href={`/training/${s.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wider text-bone transition-colors hover:text-puma">
                            View <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        ) : (
                          <Link href="/contact" className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wider text-mute transition-colors hover:text-puma">
                            Ask us <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        )}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="overflow-x-auto rounded-[1.5rem] border border-line"
              data-lenis-prevent
            >
              <table className="w-full min-w-[900px] border-collapse text-sm">
                <thead>
                  <tr className="bg-puma text-white">
                    <th className="px-4 py-4 text-left font-display text-lg tracking-wider">Time</th>
                    {days.map((d) => (
                      <th key={d} className="px-3 py-4 font-display text-lg tracking-wider">
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hours.map((h, r) => (
                    <motion.tr key={h} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: r * 0.03 }} className="border-t border-line">
                      <td className="whitespace-nowrap bg-white/[0.03] px-4 py-3 font-display text-base tracking-wider text-mute">{fmt(h)}</td>
                      {days.map((d) => {
                        const s = timetable[d].find((x) => x.hour === h);
                        return (
                          <td key={d} className="border-l border-line p-1.5 text-center">
                            {s && (
                              <span className={clsx("block rounded-lg px-2 py-2 text-xs font-semibold leading-tight", color(s.name))}>{s.name}</span>
                            )}
                          </td>
                        );
                      })}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
